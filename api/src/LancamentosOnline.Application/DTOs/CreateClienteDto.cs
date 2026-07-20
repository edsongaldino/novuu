using System;

namespace LancamentosOnline.Application.DTOs;

public class CreateClienteDto
{
    public string Nome { get; set; } = string.Empty;
    public string Cpf { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Telefone { get; set; }
    public DateTime? DataNascimento { get; set; }
    public string? EstadoCivil { get; set; }
}
