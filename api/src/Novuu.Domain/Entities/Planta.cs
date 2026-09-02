namespace Novuu.Domain.Entities;

public class Planta : BaseEntity
{
    public int ConstrutoraId { get; set; }
    public int EmpreendimentoId { get; set; }
    public int? TorreId { get; set; }
    public string? Nome { get; set; }
    public string? Observacoes { get; set; }
    public string? Status { get; set; }
    public decimal? AreaPrivativa { get; set; }
    public int? QtdDormitorio { get; set; }
    public int? QtdSuite { get; set; }
    public int? QtdBanheiro { get; set; }
    public int? VagasGaragem { get; set; }
    public string? PlantaTipo { get; set; }
    public int? FotoPlanta { get; set; }
    public int? FotoPrimeiraPlanta { get; set; }
    public int? FotoSegundaPlanta { get; set; }
    public int? FotoTerceiraPlanta { get; set; }

    public Construtora? Construtora { get; set; }
    public Empreendimento? Empreendimento { get; set; }
    public ICollection<Foto> Fotos { get; set; } = new List<Foto>();
}
