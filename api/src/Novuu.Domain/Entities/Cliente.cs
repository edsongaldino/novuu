using System;

namespace Novuu.Domain.Entities;

public class Cliente : BaseEntity
{
    public string Nome { get; set; } = string.Empty;
    public string Cpf { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public string? Email { get; set; }
    public string? Telefone { get; set; }
    public string? EstadoCivil { get; set; }
    
    public string? SenhaHash { get; set; }
    public string? GoogleId { get; set; }
    public string? FotoUrl { get; set; }
    
    // Preferences and Additional Profile Data
    public string? Cidade { get; set; }
    public bool PrefEmail { get; set; } = true;
    public bool PrefComunicacoes { get; set; } = true;
}
