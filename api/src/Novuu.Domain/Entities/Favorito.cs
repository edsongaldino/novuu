using System;

namespace Novuu.Domain.Entities;

public class Favorito : BaseEntity
{
    public int ClienteId { get; set; }
    public Cliente? Cliente { get; set; }

    public int EmpreendimentoId { get; set; }
    public Empreendimento? Empreendimento { get; set; }
}
