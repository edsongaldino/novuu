using System;

namespace LancamentosOnline.Domain.Entities;

public class Lead : BaseEntity
{
    public int ConstrutoraId { get; set; }
    public Construtora Construtora { get; set; } = null!;
    public int EmpreendimentoId { get; set; }
    public Empreendimento Empreendimento { get; set; } = null!;
    
    public string Nome { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string? Telefone { get; set; }
    public string? Mensagem { get; set; }
    
    public string? Previsao { get; set; }
    public string? Interesse { get; set; }
    public string? Renda { get; set; }
    
    public string? Dispositivo { get; set; }
    public string? Origem { get; set; }
    public string? Tempo { get; set; }
    
    public string Status { get; set; } = "Novo"; // Novo, Atendido, Em Negociação, Proposta em Análise
}
