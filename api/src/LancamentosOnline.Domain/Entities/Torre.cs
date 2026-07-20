using System.Collections.Generic;

namespace LancamentosOnline.Domain.Entities;

public class Torre : BaseEntity
{
    public string Nome { get; set; } = string.Empty;
    public int ConstrutoraId { get; set; }
    public int EmpreendimentoId { get; set; }
    public Empreendimento Empreendimento { get; set; } = null!;
    public string? PrevisaoEntrega { get; set; }
    public string? Etapa { get; set; }
    public string Status { get; set; } = "Liberada";
    public string? Observacoes { get; set; }
    public int? PrevisaoEntregaAno { get; set; }
    public int? PrevisaoEntregaMes { get; set; }
    
    public ICollection<Andar> Andares { get; set; } = new List<Andar>();
    public ICollection<Unidade> Unidades { get; set; } = new List<Unidade>();
}
