using System.Collections.Generic;

namespace Novuu.Domain.Entities;

public class EmpreendimentoSubtipo : BaseEntity
{
    public string Nome { get; set; } = string.Empty;
    public string Tipo { get; set; } = "Vertical";
    
    public ICollection<EmpreendimentoVariacao> Variacoes { get; set; } = new List<EmpreendimentoVariacao>();
    public ICollection<Empreendimento> Empreendimentos { get; set; } = new List<Empreendimento>();
}
