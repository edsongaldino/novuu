using System;

namespace Novuu.Application.DTOs;

public class UpdatePerfilDto
{
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Telefone { get; set; }
    public string? Cidade { get; set; }
}

public class UpdateSenhaDto
{
    public string NovaSenha { get; set; } = string.Empty;
}

public class UpdatePreferenciasDto
{
    public bool PrefEmail { get; set; }
    public bool PrefComunicacoes { get; set; }
}

public class ClientePerfilResponseDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Telefone { get; set; }
    public string? Cidade { get; set; }
    public string? FotoUrl { get; set; }
    public bool PrefEmail { get; set; }
    public bool PrefComunicacoes { get; set; }
    public DateTime? CreatedAt { get; set; }
}
