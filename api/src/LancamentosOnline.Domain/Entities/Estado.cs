using System.Collections.Generic;

namespace LancamentosOnline.Domain.Entities;

public class Estado : BaseEntity
{
    public string Uf { get; set; } = string.Empty;
    public string Nome { get; set; } = string.Empty;
    public ICollection<Cidade> Cidades { get; set; } = new List<Cidade>();
}
