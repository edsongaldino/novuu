namespace LancamentosOnline.Domain.Entities;

public class Bairro : BaseEntity
{
    public int CidadeId { get; set; }
    public Cidade Cidade { get; set; } = null!;
    public string Nome { get; set; } = string.Empty;
}
