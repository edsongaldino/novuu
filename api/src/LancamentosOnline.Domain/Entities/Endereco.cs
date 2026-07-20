namespace LancamentosOnline.Domain.Entities;

public class Endereco : BaseEntity
{
    public int? ConstrutoraId { get; set; }
    public int EstadoId { get; set; }
    public int CidadeId { get; set; }
    public int BairroId { get; set; }
    public string Cep { get; set; } = string.Empty;
    public string Logradouro { get; set; } = string.Empty;
    public string? Complemento { get; set; }
    public string? Numero { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
}
