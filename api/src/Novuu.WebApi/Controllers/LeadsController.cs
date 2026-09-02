using Microsoft.AspNetCore.Mvc;
using Novuu.Application.Interfaces;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Novuu.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeadsController : ControllerBase
{
    private readonly ILeadService _leadService;
    private readonly IApplicationDbContext _context;

    public LeadsController(ILeadService leadService, IApplicationDbContext context)
    {
        _leadService = leadService;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] int? construtoraId)
    {
        var query = _context.Leads
            .Include(l => l.Empreendimento)
            .Include(l => l.Construtora)
            .AsQueryable();

        if (construtoraId.HasValue && construtoraId.Value > 0)
        {
            query = query.Where(l => l.ConstrutoraId == construtoraId.Value);
        }

        var leads = await query
            .OrderByDescending(l => l.CreatedAt)
            .Select(l => new
            {
                l.Id,
                l.Nome,
                l.Email,
                l.Telefone,
                l.Mensagem,
                EmpreendimentoNome = l.Empreendimento != null ? l.Empreendimento.Nome : "Residencial Aurora",
                ConstrutoraNome = l.Construtora != null ? l.Construtora.Nome : (l.Empreendimento != null && l.Empreendimento.Construtora != null ? l.Empreendimento.Construtora.Nome : "Plaenge"),
                Origem = string.IsNullOrEmpty(l.Origem) ? "Site" : l.Origem,
                Status = string.IsNullOrEmpty(l.Status) ? "Novo" : l.Status,
                Responsavel = "Ana Paula",
                l.CreatedAt
            })
            .ToListAsync();

        return Ok(leads);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Novuu.Domain.Entities.Lead data)
    {
        data.CreatedAt = System.DateTime.UtcNow;
        if (string.IsNullOrEmpty(data.Status))
        {
            data.Status = "Novo";
        }
        if (string.IsNullOrEmpty(data.Origem))
        {
            data.Origem = "Site";
        }
        _context.Leads.Add(data);
        await _context.SaveChangesAsync();
        return Ok(data);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Novuu.Domain.Entities.Lead updateData)
    {
        var lead = await _context.Leads.FindAsync(id);
        if (lead == null) return NotFound();

        if (!string.IsNullOrEmpty(updateData.Nome)) lead.Nome = updateData.Nome;
        if (!string.IsNullOrEmpty(updateData.Email)) lead.Email = updateData.Email;
        if (!string.IsNullOrEmpty(updateData.Telefone)) lead.Telefone = updateData.Telefone;
        if (!string.IsNullOrEmpty(updateData.Status)) lead.Status = updateData.Status;
        if (!string.IsNullOrEmpty(updateData.Origem)) lead.Origem = updateData.Origem;
        if (!string.IsNullOrEmpty(updateData.Mensagem)) lead.Mensagem = updateData.Mensagem;

        await _context.SaveChangesAsync();
        return Ok(lead);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var lead = await _context.Leads.FindAsync(id);
        if (lead == null) return NotFound();

        _context.Leads.Remove(lead);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
