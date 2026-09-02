using System.ComponentModel.DataAnnotations.Schema;

namespace Novuu.Domain.Entities;

[Table("caracteristicas_empreendimentos")]
public class CaracteristicaEmpreendimento
{
    [Column("caracteristica_id")]
    public int CaracteristicaId { get; set; }

    [Column("empreendimento_id")]
    public int EmpreendimentoId { get; set; }

    [Column("valor")]
    public string? Valor { get; set; }

    public Caracteristica? Caracteristica { get; set; }
    public Empreendimento? Empreendimento { get; set; }
}
