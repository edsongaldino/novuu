namespace LancamentosOnline.Domain.Entities;

public class Andar : BaseEntity
{
    public int ConstrutoraId { get; set; }
    public int TorreId { get; set; }
    public Torre Torre { get; set; } = null!;
    public int Numero { get; set; }
}
