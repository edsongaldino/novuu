using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Novuu.Application.DTOs;
using Novuu.Application.Interfaces;
using Novuu.Domain.Entities;
using System;
using System.Threading.Tasks;
using Google.Apis.Auth;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Novuu.WebApi.Controllers;

[ApiController]
[Route("api/clientes")]
public class ClientesAuthController : ControllerBase
{
    private readonly IApplicationDbContext _context;
    private readonly IConfiguration _config;

    public ClientesAuthController(IApplicationDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] ClienteRegisterRequest request)
    {
        if (await _context.Clientes.AnyAsync(c => c.Email == request.Email))
        {
            return BadRequest(new { message = "E-mail já está em uso." });
        }

        var cliente = new Cliente
        {
            Nome = request.Nome,
            Email = request.Email,
            SenhaHash = request.Senha, // Simplificado.
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _context.Clientes.Add(cliente);
        await _context.SaveChangesAsync();

        var token = GenerateJwtToken(cliente);
        return Ok(new ClienteAuthResponse
        {
            ClienteId = cliente.Id,
            Nome = cliente.Nome,
            Email = cliente.Email ?? "",
            Token = token
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] ClienteLoginRequest request)
    {
        var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Email == request.Email);
        
        if (cliente == null || cliente.SenhaHash != request.Senha) // Simplificado. O ideal é usar BCrypt.
        {
            return Unauthorized(new { message = "E-mail ou senha inválidos." });
        }

        var token = GenerateJwtToken(cliente);
        return Ok(new ClienteAuthResponse
        {
            ClienteId = cliente.Id,
            Nome = cliente.Nome,
            Email = cliente.Email ?? "",
            FotoUrl = cliente.FotoUrl,
            Token = token
        });
    }

    [HttpPost("google")]
    public async Task<IActionResult> GoogleLogin([FromBody] ClienteGoogleLoginRequest request)
    {
        try
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                // Aqui podemos adicionar o Google Client ID depois para validar a audiência
                // Audience = new List<string>() { "SEU_CLIENT_ID" }
            };

            var payload = await GoogleJsonWebSignature.ValidateAsync(request.Credential, settings);
            
            var cliente = await _context.Clientes.FirstOrDefaultAsync(c => c.Email == payload.Email);
            
            if (cliente == null)
            {
                cliente = new Cliente
                {
                    Email = payload.Email,
                    Nome = payload.Name,
                    GoogleId = payload.Subject,
                    FotoUrl = payload.Picture,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                };
                _context.Clientes.Add(cliente);
                await _context.SaveChangesAsync();
            }
            else
            {
                if (cliente.GoogleId == null)
                {
                    cliente.GoogleId = payload.Subject;
                    cliente.FotoUrl = payload.Picture;
                    cliente.UpdatedAt = DateTime.UtcNow;
                    await _context.SaveChangesAsync();
                }
            }

            var token = GenerateJwtToken(cliente);
            return Ok(new ClienteAuthResponse
            {
                ClienteId = cliente.Id,
                Nome = cliente.Nome,
                Email = cliente.Email ?? "",
                FotoUrl = cliente.FotoUrl,
                Token = token
            });
        }
        catch (InvalidJwtException)
        {
            return BadRequest(new { message = "Token do Google inválido." });
        }
    }

    private string GenerateJwtToken(Cliente cliente)
    {
        var secret = _config["Jwt:Key"] ?? "chave-secreta-padrao-super-segura-123456";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, cliente.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, cliente.Email ?? ""),
            new Claim("name", cliente.Nome),
            new Claim("role", "Cliente")
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"] ?? "Novuu",
            audience: _config["Jwt:Audience"] ?? "NovuuPortal",
            claims: claims,
            expires: DateTime.Now.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
