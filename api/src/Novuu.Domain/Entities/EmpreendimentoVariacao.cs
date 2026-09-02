using System.Collections.Generic;

namespace Novuu.Domain.Entities;

public class EmpreendimentoVariacao : BaseEntity
{
    public int SubtipoId { get; set; }
    public EmpreendimentoSubtipo Subtipo { get; set; } = null!;
    public string Nome { get; set; } = string.Empty;
    
    public ICollection<Empreendimento> Empreendimentos { get; set; } = new List<Empreendimento>();
}
