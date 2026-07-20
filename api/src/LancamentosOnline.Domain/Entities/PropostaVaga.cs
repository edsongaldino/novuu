namespace LancamentosOnline.Domain.Entities;

public class PropostaVaga : BaseEntity
{
    public int PropostaId { get; set; }
    public Proposta Proposta { get; set; } = null!;
    public int GaragemId { get; set; }
    public Garagem Garagem { get; set; } = null!;
}
