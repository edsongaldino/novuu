namespace LancamentosOnline.Domain.Entities;

public class Garagem : BaseEntity
{
    public int EmpreendimentoId { get; set; }
    public int ConstrutoraId { get; set; }
    public int? TorreId { get; set; }
    public int? UnidadeId { get; set; }
    public int? PavimentoGaragemId { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Situacao { get; set; } = "DisponÃ­vel";
    public string FormatoVaga { get; set; } = "PadrÃ£o";
}
