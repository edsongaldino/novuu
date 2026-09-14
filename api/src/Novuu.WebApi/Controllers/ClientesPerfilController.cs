using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Novuu.Application.DTOs;
using Novuu.Infrastructure.Data;
using System.Security.Claims;

namespace Novuu.WebApi.Controllers;

[ApiController]
[Route("api/clientes/perfil")]
[Authorize] // Only authenticated portal users can access
public class ClientesPerfilController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ClientesPerfilController(ApplicationDbContext context)
    {
        _context = context;
    }

    private int GetClienteId()
    {
        return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");
    }

    [HttpGet]
    public async Task<IActionResult> GetPerfil()
    {
        var clienteId = GetClienteId();
        var cliente = await _context.Clientes.FindAsync(clienteId);
        
        if (cliente == null)
            return NotFound("Cliente não encontrado.");

        var response = new ClientePerfilResponseDto
        {
            Id = cliente.Id,
            Nome = cliente.Nome,
            Email = cliente.Email ?? "",
            Telefone = cliente.Telefone,
            Cidade = cliente.Cidade,
            FotoUrl = cliente.FotoUrl,
            PrefEmail = cliente.PrefEmail,
            PrefComunicacoes = cliente.PrefComunicacoes,
            CreatedAt = cliente.CreatedAt
        };

        return Ok(response);
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePerfil([FromBody] UpdatePerfilDto dto)
    {
        var clienteId = GetClienteId();
        var cliente = await _context.Clientes.FindAsync(clienteId);
        
        if (cliente == null)
            return NotFound("Cliente não encontrado.");

        cliente.Nome = dto.Nome;
        cliente.Email = dto.Email;
        cliente.Telefone = dto.Telefone;
        cliente.Cidade = dto.Cidade;
        cliente.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Perfil atualizado com sucesso." });
    }

    [HttpPut("senha")]
    public async Task<IActionResult> UpdateSenha([FromBody] UpdateSenhaDto dto)
    {
        var clienteId = GetClienteId();
        var cliente = await _context.Clientes.FindAsync(clienteId);
        
        if (cliente == null)
            return NotFound("Cliente não encontrado.");

        // Mantendo como texto plano para alinhar com o ClientesAuthController atual
        // No futuro, quando formos criptografar as senhas no cadastro, habilitamos o BCrypt aqui também!
        cliente.SenhaHash = dto.NovaSenha;
        cliente.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Senha atualizada com sucesso." });
    }

    [HttpPut("preferencias")]
    public async Task<IActionResult> UpdatePreferencias([FromBody] UpdatePreferenciasDto dto)
    {
        var clienteId = GetClienteId();
        var cliente = await _context.Clientes.FindAsync(clienteId);
        
        if (cliente == null)
            return NotFound("Cliente não encontrado.");

        cliente.PrefEmail = dto.PrefEmail;
        cliente.PrefComunicacoes = dto.PrefComunicacoes;
        cliente.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new { message = "Preferências atualizadas com sucesso." });
    }
}
