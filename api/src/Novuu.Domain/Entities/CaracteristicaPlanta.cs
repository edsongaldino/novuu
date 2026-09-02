using System.ComponentModel.DataAnnotations.Schema;

namespace Novuu.Domain.Entities;

[Table("caracteristicas_plantas")]
public class CaracteristicaPlanta
{
    [Column("caracteristica_id")]
    public int CaracteristicaId { get; set; }

    [Column("planta_id")]
    public int PlantaId { get; set; }

    [Column("valor")]
    public string? Valor { get; set; }

    [Column("nome")]
    public string? Nome { get; set; }

    public Caracteristica? Caracteristica { get; set; }
    public Planta? Planta { get; set; }
}
