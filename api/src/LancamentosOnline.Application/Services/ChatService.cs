using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LancamentosOnline.Application.DTOs;
using LancamentosOnline.Application.Interfaces;

namespace LancamentosOnline.Application.Services;

public class ChatService : IChatService
{
    private readonly IApplicationDbContext _context;

    public ChatService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ChatResponse> ProcessMessageAsync(ChatRequest request)
    {
        var msg = request.Message.ToLower();
        var reply = string.Empty;

        var properties = await _context.Empreendimentos
            .Include(e => e.Construtora)
            .ToListAsync();

        var volare = properties.FirstOrDefault(p => p.Nome.ToLower().Contains("volare"));
        var bravie = properties.FirstOrDefault(p => p.Nome.ToLower().Contains("bravie"));
        var vox = properties.FirstOrDefault(p => p.Nome.ToLower().Contains("vox"));
        var lagos = properties.FirstOrDefault(p => p.Nome.ToLower().Contains("lagos") || p.Nome.ToLower().Contains("florais"));

        if (volare != null && (msg.Contains("volare") || msg.Contains("villaggio")))
        {
            reply = $"O **Villaggio Volare** Ã© um empreendimento da **{volare.Construtora.NomeAbreviado}** localizado em CuiabÃ¡. Atualmente estÃ¡ **{volare.PrevisaoEntrega}** e conta com unidades de alto padrÃ£o a partir de **R$ {volare.ValorInicial:N2}**. Gostaria de simular uma proposta para ele?";
        }
        else if (bravie != null && msg.Contains("bravie"))
        {
            reply = $"O **Bravie - Beyond Living** Ã© um lanÃ§amento moderno da **{bravie.Construtora.NomeAbreviado}** no Bosque da SaÃºde. A previsÃ£o de entrega Ã© para **{bravie.PrevisaoEntrega}**, com valores a partir de **R$ {bravie.ValorInicial:N2}**. Ã‰ ideal para quem busca sofisticaÃ§Ã£o!";
        }
        else if (vox != null && msg.Contains("vox"))
        {
            reply = $"O **VOX** Ã© um dos projetos mais exclusivos da **{vox.Construtora.NomeAbreviado}** no Jardim AclimaÃ§Ã£o. Possui unidades de alto luxo com previsÃ£o para **{vox.PrevisaoEntrega}** e preÃ§os a partir de **R$ {vox.ValorInicial:N2}**. Quer receber a tabela de vendas dele?";
        }
        else if (lagos != null && (msg.Contains("lagos") || msg.Contains("florais")))
        {
            reply = $"O **Florais dos Lagos** Ã© um condomÃ­nio fechado horizontal de alto padrÃ£o da **{lagos.Construtora.NomeAbreviado}**. EstÃ¡ **{lagos.PrevisaoEntrega}** e possui terrenos e casas exclusivas a partir de **R$ {lagos.ValorInicial:N2}**.";
        }
        else if (msg.Contains("plaenge"))
        {
            var plaengeProps = properties.Where(p => p.Construtora.NomeAbreviado.ToLower() == "plaenge").Select(p => p.Nome);
            reply = $"A **Plaenge** Ã© referÃªncia em alto padrÃ£o em CuiabÃ¡. Tenho os seguintes lanÃ§amentos deles cadastrados: {string.Join(", ", plaengeProps)}. Qual deles mais te chama atenÃ§Ã£o?";
        }
        else if (msg.Contains("ginco"))
        {
            var gincoProps = properties.Where(p => p.Construtora.NomeAbreviado.ToLower() == "ginco").Select(p => p.Nome);
            reply = $"A **Ginco** Ã© especialista em condomÃ­nios horizontais fechados. Atualmente temos cadastrado o: {string.Join(", ", gincoProps)}. Quer saber mais sobre lotes disponÃ­veis?";
        }
        else if (msg.Contains("preÃ§o") || msg.Contains("valor") || msg.Contains("quanto custa") || msg.Contains("preÃ§os"))
        {
            var cheapest = properties.OrderBy(p => p.ValorInicial).FirstOrDefault();
            reply = cheapest != null 
                ? $"Os valores dos lanÃ§amentos partem de **R$ {cheapest.ValorInicial:N2}** (no **{cheapest.Nome}** da {cheapest.Construtora.NomeAbreviado}) atÃ© mais de R$ 1.900.000,00. Qual a sua faixa de orÃ§amento ideal?"
                : "NÃ£o encontrei valores cadastrados no momento.";
        }
        else
        {
            reply = "OlÃ¡! Eu sou a **Luna**, sua assistente virtual especialista em imÃ³veis. Posso te ajudar a encontrar o apartamento ou lote ideal em CuiabÃ¡. Experimente perguntar sobre lanÃ§amentos da **Plaenge**, condomÃ­nios da **Ginco**, ou sobre imÃ³veis especÃ­ficos como o **Bravie**, **VOX** ou **Villaggio Volare**!";
        }

        return new ChatResponse { Reply = reply };
    }
}
