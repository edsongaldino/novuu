using System.Collections.Generic;

namespace LancamentosOnline.Domain.Entities;

public class Empreendimento : BaseEntity
{
    public int ConstrutoraId { get; set; }
    public Construtora Construtora { get; set; } = null!;
    public string Nome { get; set; } = string.Empty;
    public string? Descricao { get; set; }
    public string Tipo { get; set; } = "Vertical";
    public decimal? ValorInicial { get; set; }
    public decimal? ValorFinal { get; set; }
    public string? PrevisaoEntrega { get; set; }
    public int QtdeTorre { get; set; }
    public int QtdeQuadra { get; set; }
    public decimal? Latitude { get; set; }
    public decimal? Longitude { get; set; }
    public string Status { get; set; } = "Liberado";
    public bool GerouUnidades { get; set; }
    public string? Logomarca { get; set; }
    
    public ICollection<Torre> Torres { get; set; } = new List<Torre>();
    public ICollection<Quadra> Quadras { get; set; } = new List<Quadra>();
}
