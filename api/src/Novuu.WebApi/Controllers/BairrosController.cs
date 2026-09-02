using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Novuu.Infrastructure.Data;
using Novuu.Domain.Entities;
using System.Threading.Tasks;

namespace Novuu.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BairrosController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public BairrosController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var bairros = await _context.Bairros.Include(b => b.Cidade).ToListAsync();
        return Ok(bairros);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Bairro data)
    {
        if (data.CidadeId == 0)
        {
            var city = await _context.Cidades.FirstOrDefaultAsync();
            if (city != null)
            {
                data.CidadeId = city.Id;
            }
        }
        _context.Bairros.Add(data);
        await _context.SaveChangesAsync();
        
        var created = await _context.Bairros
            .Include(b => b.Cidade)
            .FirstOrDefaultAsync(b => b.Id == data.Id);
            
        return Ok(created);
    }
}
