using System.Collections.Generic;

namespace LancamentosOnline.Domain.Entities;

public class Proposta : BaseEntity
{
    public int ConstrutoraId { get; set; }
    public int EmpreendimentoId { get; set; }
    public int UnidadeId { get; set; }
    public Unidade Unidade { get; set; } = null!;
    public int? OfertaId { get; set; }
    public int ClienteId { get; set; }
    public Cliente Cliente { get; set; } = null!;
    
    public decimal ValorProposta { get; set; }
    public decimal EntradaProposta { get; set; }
    public int? QuantidadeParcela { get; set; }
    public decimal? ValorParcela { get; set; }
    public decimal? SaldoRemanescente { get; set; }
    public decimal? ValorBens { get; set; }
    
    public ICollection<PropostaBalao> Baloes { get; set; } = new List<PropostaBalao>();
    public ICollection<PropostaVaga> Vagas { get; set; } = new List<PropostaVaga>();
}
