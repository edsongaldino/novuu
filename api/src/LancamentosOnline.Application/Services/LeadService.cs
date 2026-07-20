using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LancamentosOnline.Application.DTOs;
using LancamentosOnline.Application.Interfaces;

namespace LancamentosOnline.Application.Services;

public class LeadService : ILeadService
{
    private readonly IApplicationDbContext _context;

    public LeadService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<LeadDto>> GetLeadsByConstrutoraAsync(int construtoraId)
    {
        var leads = await _context.Leads
            .Include(l => l.Empreendimento)
            .Where(l => l.ConstrutoraId == construtoraId)
            .OrderByDescending(l => l.CreatedAt)
            .Select(l => new LeadDto
            {
                Id = l.Id,
                Nome = l.Nome,
                Email = l.Email,
                Telefone = l.Telefone,
                Mensagem = l.Mensagem,
                EmpreendimentoNome = l.Empreendimento.Nome,
                Status = l.Status,
                CreatedAt = l.CreatedAt
            })
            .ToListAsync();

        return leads;
    }
}
