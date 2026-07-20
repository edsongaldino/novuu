using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LancamentosOnline.Application.DTOs;
using LancamentosOnline.Application.Interfaces;
namespace LancamentosOnline.Application.Services;

public class EmpreendimentoService : IEmpreendimentoService
{
    private readonly IApplicationDbContext _context;

    public EmpreendimentoService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<EmpreendimentoListItemDto>> SearchAsync(SearchRequest request)
    {
        var query = _context.Empreendimentos
            .Include(e => e.Construtora)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Query))
        {
            var queryLower = request.Query.ToLower();
            query = query.Where(e => e.Nome.ToLower().Contains(queryLower) ||
                                     (e.Descricao != null && e.Descricao.ToLower().Contains(queryLower)));
        }

        if (request.CidadeId.HasValue)
        {
            // Simple filter for mock data. We can extend relationships as database model evolves
            query = query.Where(e => e.Nome.Contains("CuiabÃ¡") || e.Descricao.Contains("CuiabÃ¡"));
        }

        if (!string.IsNullOrWhiteSpace(request.Tipo))
        {
            query = query.Where(e => e.Tipo == request.Tipo);
        }

        if (request.PrecoMinimo.HasValue)
        {
            query = query.Where(e => e.ValorInicial >= request.PrecoMinimo.Value);
        }

        if (request.PrecoMaximo.HasValue)
        {
            query = query.Where(e => e.ValorInicial <= request.PrecoMaximo.Value);
        }

        var list = await query
            .Select(e => new EmpreendimentoListItemDto
            {
                Id = e.Id,
                Nome = e.Nome,
                ConstrutoraNome = e.Construtora.NomeAbreviado ?? e.Construtora.Nome,
                ConstrutoraId = e.ConstrutoraId,
                Tipo = e.Tipo,
                ValorInicial = e.ValorInicial,
                ValorFinal = e.ValorFinal,
                PrevisaoEntrega = e.PrevisaoEntrega,
                Logomarca = e.Logomarca,
                Descricao = e.Descricao
            })
            .ToListAsync();

        return list;
    }

    public async Task<IEnumerable<AutocompleteDto>> GetAutocompleteAsync(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return Enumerable.Empty<AutocompleteDto>();
        }

        var queryLower = query.ToLower();
        var results = new List<AutocompleteDto>();

        // 1. Search Cidades
        var cidades = await _context.Cidades
            .Where(c => c.Nome.ToLower().Contains(queryLower) && c.Status == "L")
            .Take(3)
            .Select(c => new AutocompleteDto { Id = c.Id, Texto = c.Nome, Tipo = "Cidade" })
            .ToListAsync();
        results.AddRange(cidades);

        // 2. Search Bairros
        var bairros = await _context.Bairros
            .Where(b => b.Nome.ToLower().Contains(queryLower))
            .Take(3)
            .Select(b => new AutocompleteDto { Id = b.Id, Texto = b.Nome, Tipo = "Bairro" })
            .ToListAsync();
        results.AddRange(bairros);

        // 3. Search Empreendimentos
        var emps = await _context.Empreendimentos
            .Where(e => e.Nome.ToLower().Contains(queryLower) && e.Status == "Liberado")
            .Take(5)
            .Select(e => new AutocompleteDto { Id = e.Id, Texto = e.Nome, Tipo = "Empreendimento" })
            .ToListAsync();
        results.AddRange(emps);

        // 4. Search Construtoras
        var construtoras = await _context.Construtoras
            .Where(c => c.Nome.ToLower().Contains(queryLower) && c.Status == "Liberada")
            .Take(3)
            .Select(c => new AutocompleteDto { Id = c.Id, Texto = c.NomeAbreviado ?? c.Nome, Tipo = "Construtora" })
            .ToListAsync();
        results.AddRange(construtoras);

        return results;
    }
}
