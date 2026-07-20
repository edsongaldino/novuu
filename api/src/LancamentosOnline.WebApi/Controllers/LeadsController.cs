using Microsoft.AspNetCore.Mvc;
using LancamentosOnline.Application.Interfaces;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace LancamentosOnline.WebApi.Controllers;

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
    public async Task<IActionResult> GetByConstrutora([FromQuery] int construtoraId)
    {
        var result = await _leadService.GetLeadsByConstrutoraAsync(construtoraId);
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] LancamentosOnline.Domain.Entities.Lead data)
    {
        data.CreatedAt = System.DateTime.UtcNow;
        if (string.IsNullOrEmpty(data.Status))
        {
            data.Status = "Novo";
        }
        _context.Leads.Add(data);
        await _context.SaveChangesAsync();
        return Ok(data);
    }
}
