namespace Novuu.Application.DTOs;

public class EmpreendimentoListItemDto
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string ConstrutoraNome { get; set; } = string.Empty;
    public int ConstrutoraId { get; set; }
    public string Tipo { get; set; } = string.Empty;
    public int? SubtipoId { get; set; }
    public string? SubtipoNome { get; set; }
    public int? VariacaoId { get; set; }
    public string? VariacaoNome { get; set; }
    public decimal? ValorInicial { get; set; }
    public decimal? ValorFinal { get; set; }
    public string? PrevisaoEntrega { get; set; }
    public string? ConstrutoraLogo { get; set; }
    public string? ConstrutoraLogoUrl { get; set; }
    public string? Logomarca { get; set; }
    public string? ImagemUrl { get; set; }
    public string? Descricao { get; set; }
    public int? EnderecoId { get; set; }
    public string? EnderecoFormatado { get; set; }
    public string? Logradouro { get; set; }
    public string? Numero { get; set; }
    public string? Complemento { get; set; }
    public string? BairroNome { get; set; }
    public string? CidadeNome { get; set; }
    public string? EstadoUf { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
}
