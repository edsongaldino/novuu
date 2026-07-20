using System;

namespace LancamentosOnline.Domain.Entities;

public class User : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public string? FotoPerfil { get; set; }
    public string? Celular { get; set; }
    public string? TelefoneFixo { get; set; }
    public string? Whatsapp { get; set; }
    public string? PerfilProfissional { get; set; }
    public int? ConstrutoraId { get; set; }
    public Construtora? Construtora { get; set; }
}
