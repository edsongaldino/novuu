using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Novuu.Infrastructure.Data;
using Novuu.Domain.Entities;
using System.Threading.Tasks;
using System.Linq;

namespace Novuu.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SubtiposController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public SubtiposController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _context.Subtipos
            .Include(s => s.Variacoes)
            .ToListAsync();
        return Ok(list);
    }

    [HttpGet("tipo/{tipo}")]
    public async Task<IActionResult> GetByTipo(string tipo)
    {
        var list = await _context.Subtipos
            .Include(s => s.Variacoes)
            .Where(s => s.Tipo.ToLower() == tipo.ToLower())
            .ToListAsync();
        return Ok(list);
    }

    [HttpGet("{subtipoId}/variacoes")]
    public async Task<IActionResult> GetVariacoes(int subtipoId)
    {
        var list = await _context.Variacoes
            .Where(v => v.SubtipoId == subtipoId)
            .ToListAsync();
        return Ok(list);
    }
}
