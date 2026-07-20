namespace LancamentosOnline.Application.DTOs;

public class EmpreendimentoListItemDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string ConstrutoraNome { get; set; } = string.Empty;
    public int ConstrutoraId { get; set; }
    public string Tipo { get; set; } = string.Empty;
    public decimal? ValorInicial { get; set; }
    public decimal? ValorFinal { get; set; }
    public string? PrevisaoEntrega { get; set; }
    public string? Logomarca { get; set; }
    public string? Descricao { get; set; }
}
