using System;

namespace LancamentosOnline.Domain.Entities;

public class PropostaBalao : BaseEntity
{
    public int PropostaId { get; set; }
    public Proposta Proposta { get; set; } = null!;
    public decimal Valor { get; set; }
    public DateTime Data { get; set; }
}
