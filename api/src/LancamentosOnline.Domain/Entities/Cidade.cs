using System.Collections.Generic;

namespace LancamentosOnline.Domain.Entities;

public class Cidade : BaseEntity
{
    public int EstadoId { get; set; }
    public Estado Estado { get; set; } = null!;
    public string Nome { get; set; } = string.Empty;
    public string Status { get; set; } = "L";
    public ICollection<Bairro> Bairros { get; set; } = new List<Bairro>();
}
