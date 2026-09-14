using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Novuu.Application.DTOs;
using Novuu.Application.Interfaces;
using Novuu.Domain.Entities;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Novuu.WebApi.Controllers;

[ApiController]
[Route("api/clientes")]
[Authorize] // Requer que o usuário esteja logado (token JWT)
public class ClientesInteracoesController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ClientesInteracoesController(IApplicationDbContext context)
    {
        _context = context;
    }

    private int GetClienteId()
    {
        var claim = User.FindFirst(ClaimTypes.NameIdentifier) ?? User.FindFirst(System.IdentityModel.Tokens.Jwt.JwtRegisteredClaimNames.Sub);
        return claim != null ? int.Parse(claim.Value) : 0;
    }

    // --- FAVORITOS ---

    [HttpGet("favoritos")]
    public async Task<IActionResult> GetFavoritos()
    {
        var clienteId = GetClienteId();
        var favoritos = await _context.Favoritos
            .Include(f => f.Empreendimento)
            .Where(f => f.ClienteId == clienteId)
            .Select(f => new FavoritoDto
            {
                EmpreendimentoId = f.EmpreendimentoId,
                Nome = f.Empreendimento!.Nome,
                ImagemUrl = f.Empreendimento.Logomarca // Ajuste conforme a lógica de capas no portal
            })
            .ToListAsync();

        return Ok(favoritos);
    }

    [HttpPost("favoritos/{empreendimentoId}")]
    public async Task<IActionResult> ToggleFavorito(int empreendimentoId)
    {
        var clienteId = GetClienteId();
        
        var existe = await _context.Favoritos
            .FirstOrDefaultAsync(f => f.ClienteId == clienteId && f.EmpreendimentoId == empreendimentoId);

        if (existe != null)
        {
            // Se já tem, remove (toggle)
            _context.Favoritos.Remove(existe);
            await _context.SaveChangesAsync();
            return Ok(new { favoritado = false });
        }
        else
        {
            // Adiciona
            var fav = new Favorito
            {
                ClienteId = clienteId,
                EmpreendimentoId = empreendimentoId,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            _context.Favoritos.Add(fav);
            await _context.SaveChangesAsync();
            return Ok(new { favoritado = true });
        }
    }

    // --- HISTÓRICO ---

    [HttpGet("historico")]
    public async Task<IActionResult> GetHistorico()
    {
        var clienteId = GetClienteId();
        var historico = await _context.HistoricoVisitas
            .Include(h => h.Empreendimento)
            .Where(h => h.ClienteId == clienteId)
            .OrderByDescending(h => h.DataAcesso)
            .Take(20)
            .Select(h => new HistoricoVisitaDto
            {
                EmpreendimentoId = h.EmpreendimentoId,
                Nome = h.Empreendimento!.Nome,
                ImagemUrl = h.Empreendimento.Logomarca,
                DataAcesso = h.DataAcesso
            })
            .ToListAsync();

        return Ok(historico);
    }

    [HttpPost("historico/{empreendimentoId}")]
    public async Task<IActionResult> AddVisita(int empreendimentoId)
    {
        var clienteId = GetClienteId();
        
        var visita = await _context.HistoricoVisitas
            .FirstOrDefaultAsync(h => h.ClienteId == clienteId && h.EmpreendimentoId == empreendimentoId);

        if (visita != null)
        {
            // Atualiza a data se já viu antes
            visita.DataAcesso = DateTime.UtcNow;
            visita.UpdatedAt = DateTime.UtcNow;
        }
        else
        {
            visita = new HistoricoVisita
            {
                ClienteId = clienteId,
                EmpreendimentoId = empreendimentoId,
                DataAcesso = DateTime.UtcNow,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            _context.HistoricoVisitas.Add(visita);
        }

        await _context.SaveChangesAsync();
        return Ok();
    }
}
