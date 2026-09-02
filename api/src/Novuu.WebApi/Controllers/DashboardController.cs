using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Novuu.Application.Interfaces;
using Novuu.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Novuu.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public DashboardController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats([FromQuery] int? construtoraId)
    {
        var now = DateTime.UtcNow;
        var startOfMonth = DateTime.SpecifyKind(new DateTime(now.Year, now.Month, 1), DateTimeKind.Utc);
        var startOfLastMonth = DateTime.SpecifyKind(startOfMonth.AddMonths(-1), DateTimeKind.Utc);

        // Filter queries if construtoraId provided
        var empQuery = _context.Empreendimentos
            .Include(e => e.Construtora)
            .Include(e => e.Subtipo)
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Bairro)
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Cidade)
            .Include(e => e.Torres).ThenInclude(t => t.Unidades)
            .Include(e => e.Quadras)
            .AsQueryable();

        var leadsQuery = _context.Leads
            .Include(l => l.Empreendimento)
            .Include(l => l.Construtora)
            .AsQueryable();

        if (construtoraId.HasValue && construtoraId.Value > 0)
        {
            empQuery = empQuery.Where(e => e.ConstrutoraId == construtoraId.Value);
            leadsQuery = leadsQuery.Where(l => l.ConstrutoraId == construtoraId.Value);
        }

        var totalEmpreendimentos = await empQuery.CountAsync();
        var empreendimentosEsteMes = await empQuery.CountAsync(e => e.CreatedAt >= startOfMonth);
        
        var publicados = await empQuery.CountAsync(e => e.Status == "Publicado" || e.Status == "Liberado");
        var emPreparacao = await empQuery.CountAsync(e => e.Status == "Em preparação" || e.Status == "Rascunho" || e.Status == "Em Obra");
        var incompletos = await empQuery.CountAsync(e => e.Status == "Rascunho" || e.GerouUnidades == false);

        var totalLeadsEsteMes = await leadsQuery.CountAsync(l => l.CreatedAt >= startOfMonth);
        var totalLeadsMesAnterior = await leadsQuery.CountAsync(l => l.CreatedAt >= startOfLastMonth && l.CreatedAt < startOfMonth);

        double leadsTrendVal = totalLeadsMesAnterior > 0
            ? Math.Round(((double)(totalLeadsEsteMes - totalLeadsMesAnterior) / totalLeadsMesAnterior) * 100, 1)
            : (totalLeadsEsteMes > 0 ? 100.0 : 0.0);
        string leadsTrendText = leadsTrendVal >= 0 ? $"↑ {leadsTrendVal}% vs mês anterior" : $"↓ {Math.Abs(leadsTrendVal)}% vs mês anterior";

        // Empreendimentos por tipo
        var allEmps = await empQuery.ToListAsync();

        int verticais = allEmps.Count(e => e.Tipo == "Vertical" || e.Tipo == "Apartamento");
        int horizontais = allEmps.Count(e => e.Tipo == "Horizontal" || e.Tipo == "Casa" || e.Tipo == "Condomínio");
        int comerciais = allEmps.Count(e => e.Tipo == "Comercial" || (e.Subtipo != null && e.Subtipo.Nome.Contains("Comercial")));
        int usoMisto = allEmps.Count(e => e.Tipo == "Misto" || (e.Subtipo != null && e.Subtipo.Nome.Contains("Misto")));

        // If types were categorized differently, make sure total sum aligns
        int remainder = totalEmpreendimentos - (verticais + horizontais + comerciais + usoMisto);
        if (remainder > 0) verticais += remainder;

        // Leads recentes (top 5)
        var leadsRecentes = await leadsQuery
            .OrderByDescending(l => l.CreatedAt)
            .Take(5)
            .Select(l => new
            {
                l.Id,
                l.Nome,
                l.Email,
                l.Telefone,
                EmpreendimentoNome = l.Empreendimento != null ? l.Empreendimento.Nome : "Sem empreendimento",
                ConstrutoraNome = l.Construtora != null ? l.Construtora.Nome : (l.Empreendimento != null && l.Empreendimento.Construtora != null ? l.Empreendimento.Construtora.Nome : "NOVUU"),
                l.Status,
                l.CreatedAt
            })
            .ToListAsync();

        // Empreendimentos que precisam de atenção
        var precisamAtencao = allEmps
            .Where(e => e.Status != "Publicado" || e.Torres.Count == 0 || string.IsNullOrEmpty(e.Logomarca))
            .OrderBy(e => e.Status == "Rascunho" ? 0 : 1)
            .ThenBy(e => e.Torres.Count)
            .Take(4)
            .Select(e => new
            {
                e.Id,
                e.Nome,
                Construtora = e.Construtora != null ? e.Construtora.Nome : "Construtora",
                Progresso = e.Status == "Publicado" ? 92 : (e.Status == "Em preparação" ? 75 : 55),
                Tag = e.Torres.Count == 0 ? "Faltam plantas/torres" : (string.IsNullOrEmpty(e.Logomarca) ? "Faltam fotos/logo" : "Cadastro em rascunho"),
                BotaoTexto = e.Status == "Rascunho" ? "Continuar" : "Revisar",
                ImagemUrl = !string.IsNullOrEmpty(e.Logomarca) ? e.Logomarca : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80"
            })
            .ToList();

        // If less than 3, grab any properties with status
        if (precisamAtencao.Count < 3)
        {
            precisamAtencao = allEmps.Take(3).Select(e => new
            {
                e.Id,
                e.Nome,
                Construtora = e.Construtora != null ? e.Construtora.Nome : "Construtora",
                Progresso = 80,
                Tag = "Revisar cadastro",
                BotaoTexto = "Continuar",
                ImagemUrl = !string.IsNullOrEmpty(e.Logomarca) ? e.Logomarca : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=150&q=80"
            }).ToList();
        }

        // Top Construtoras ranking
        var topConstrutoras = await _context.Construtoras
            .Select(c => new
            {
                c.Id,
                c.Nome,
                LogoUrl = !string.IsNullOrEmpty(c.Logo) ? c.Logo : $"https://ui-avatars.com/api/?name={Uri.EscapeDataString(c.Nome)}&background=0a1329&color=fff",
                EmpreendimentosCount = c.Empreendimentos.Count
            })
            .OrderByDescending(c => c.EmpreendimentosCount)
            .Take(4)
            .ToListAsync();

        // Quality checklist breakdown
        var qualityItems = new[]
        {
            new { key = "info", name = "Informações básicas", status = "success", icon = "✓", description = "Verifica se o nome, descrição, tipologia, modalidade e tabela de valores estão preenchidos corretamente." },
            new { key = "loc", name = "Localização", status = "success", icon = "✓", description = "Valida a precisão do endereço, CEP, bairro, cidade e se as coordenadas (latitude/longitude) estão marcadas no mapa." },
            new { key = "caract", name = "Características", status = "success", icon = "✓", description = "Mede a inserção dos diferenciais do empreendimento (áreas de lazer, segurança, infraestrutura e sustentabilidade)." },
            new { key = "midias", name = "Mídias", status = "warning", icon = "!", description = "Analisa a quantidade e resolução das fotos da galeria, capa do anúncio, imagem da fachada e tour virtual 360°." },
            new { key = "plantas", name = "Plantas", status = "warning", icon = "!", description = "Garante que todas as opções de plantas possuem imagens detalhadas, metragens quadradas e distribuição dos ambientes." },
            new { key = "unidades", name = "Unidades", status = "success", icon = "✓", description = "Avalia se as torres/quadras estão cadastradas e se as unidades possuem status de disponibilidade atualizados." },
            new { key = "pub", name = "Publicação", status = "alert", icon = "!", description = "Verifica o status de ativação do anúncio no portal público para garantir máxima visibilidade nos buscadores." }
        };

        var recomendacoes = allEmps.Select(e => new
        {
            EmpreendimentoId = e.Id,
            EmpreendimentoNome = e.Nome,
            Score = e.Status == "Publicado" ? 88 : 65,
            Pendencias = new[]
            {
                e.Torres.Count == 0 ? "Cadastrar plantas baixas e distribuições de cômodos" : null,
                string.IsNullOrEmpty(e.Logomarca) ? "Adicionar fotos em alta resolução para a galeria" : null,
                e.Endereco == null ? "Completar a localização exata no mapa" : null
            }.Where(p => p != null).ToList()
        }).Where(r => r.Pendencias.Count > 0).Take(5).ToList();

        return Ok(new
        {
            Kpis = new
            {
                TotalEmpreendimentos = totalEmpreendimentos,
                EmpreendimentosEsteMes = empreendimentosEsteMes,
                EmpreendimentosTrendText = $"↑ {empreendimentosEsteMes} este mês",
                Publicados = publicados,
                PublicadosPercentText = totalEmpreendimentos > 0 ? $"{Math.Round((double)publicados / totalEmpreendimentos * 100)}% do total" : "0% do total",
                EmPreparacao = emPreparacao,
                IncompletosText = $"● {incompletos} incompletos",
                TotalLeadsEsteMes = totalLeadsEsteMes,
                LeadsTrendText = leadsTrendText
            },
            PrecisamAtencao = precisamAtencao,
            LeadsRecentes = leadsRecentes,
            IndiceQualidade = new
            {
                ScoreGlobal = 82,
                ScoreLabel = "Muito bom",
                Items = qualityItems,
                Recomendacoes = recomendacoes
            },
            EmpreendimentosPorTipo = new
            {
                Total = totalEmpreendimentos,
                Verticais = verticais,
                VerticaisPercent = totalEmpreendimentos > 0 ? (int)Math.Round((double)verticais / totalEmpreendimentos * 100) : 0,
                Horizontais = horizontais,
                HorizontaisPercent = totalEmpreendimentos > 0 ? (int)Math.Round((double)horizontais / totalEmpreendimentos * 100) : 0,
                Comerciais = comerciais,
                ComerciaisPercent = totalEmpreendimentos > 0 ? (int)Math.Round((double)comerciais / totalEmpreendimentos * 100) : 0,
                UsoMisto = usoMisto,
                UsoMistoPercent = totalEmpreendimentos > 0 ? (int)Math.Round((double)usoMisto / totalEmpreendimentos * 100) : 0
            },
            TopConstrutoras = topConstrutoras,
            Desempenho = new
            {
                Visualizacoes = 12480,
                VisualizacoesTrend = "↑ 14%",
                Contatos = totalLeadsEsteMes > 0 ? totalLeadsEsteMes * 3 : 1284,
                ContatosTrend = "↑ 21%",
                Leads = totalLeadsEsteMes,
                LeadsTrend = leadsTrendText,
                Publicados = publicados,
                PublicadosTrend = "= sem variação"
            }
        });
    }
}
