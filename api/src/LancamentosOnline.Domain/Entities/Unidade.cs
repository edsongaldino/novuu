namespace LancamentosOnline.Domain.Entities;

public class Unidade : BaseEntity
{
    public int ConstrutoraId { get; set; }
    public int EmpreendimentoId { get; set; }
    public int? TorreId { get; set; }
    public Torre? Torre { get; set; }
    public int? QuadraId { get; set; }
    public Quadra? Quadra { get; set; }
    public int? AndarId { get; set; }
    public Andar? Andar { get; set; }
    public int? PlantaId { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Situacao { get; set; } = "DisponÃ­vel";
    public string Status { get; set; } = "Liberada";
}
