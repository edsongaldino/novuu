using System;

namespace LancamentosOnline.Domain.Entities;

public class Cliente : BaseEntity
{
    public string Nome { get; set; } = string.Empty;
    public string Cpf { get; set; } = string.Empty;
    public DateTime? DataNascimento { get; set; }
    public string? Email { get; set; }
    public string? Telefone { get; set; }
    public string? EstadoCivil { get; set; }
}
