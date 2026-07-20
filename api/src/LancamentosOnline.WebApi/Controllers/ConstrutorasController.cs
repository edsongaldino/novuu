using Microsoft.AspNetCore.Mvc;
using LancamentosOnline.Application.Interfaces;
using LancamentosOnline.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace LancamentosOnline.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConstrutorasController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ConstrutorasController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _context.Construtoras.ToListAsync();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _context.Construtoras.FindAsync(id);
        if (item == null) return NotFound();
        return Ok(item);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Construtora item)
    {
        item.CreatedAt = DateTime.UtcNow;
        item.UpdatedAt = DateTime.UtcNow;
        
        _context.Construtoras.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }
}
