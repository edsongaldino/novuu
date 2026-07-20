using System.Collections.Generic;

namespace LancamentosOnline.Domain.Entities;

public class Quadra : BaseEntity
{
    public int EmpreendimentoId { get; set; }
    public Empreendimento Empreendimento { get; set; } = null!;
    public string Nome { get; set; } = string.Empty;
    public int TotalUnidades { get; set; }
    public string? PrevisaoEntrega { get; set; }
    public string? Nomenclatura { get; set; }
    public string? Observacoes { get; set; }
    public string Status { get; set; } = "Liberada";
    public bool GerouUnidades { get; set; }
    
    public ICollection<Unidade> Unidades { get; set; } = new List<Unidade>();
}
