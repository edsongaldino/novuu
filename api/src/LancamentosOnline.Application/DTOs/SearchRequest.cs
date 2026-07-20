namespace LancamentosOnline.Application.DTOs;

public class SearchRequest
{
    public string? Query { get; set; }
    public int? CidadeId { get; set; }
    public int? BairroId { get; set; }
    public decimal? PrecoMinimo { get; set; }
    public decimal? PrecoMaximo { get; set; }
    public string? Tipo { get; set; }
}
