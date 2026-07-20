using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LancamentosOnline.Infrastructure.Data;
using LancamentosOnline.Domain.Entities;
using System.Threading.Tasks;

namespace LancamentosOnline.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CidadesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public CidadesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var cidades = await _context.Cidades.Where(c => c.Status == "L").ToListAsync();
        return Ok(cidades);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Cidade data)
    {
        var state = await _context.Estados.FirstOrDefaultAsync();
        if (state != null)
        {
            data.EstadoId = state.Id;
        }
        data.Status = "L";
        _context.Cidades.Add(data);
        await _context.SaveChangesAsync();
        return Ok(data);
    }
}
