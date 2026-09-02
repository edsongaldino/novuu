using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Novuu.Domain.Entities;

[Table("caracteristicas")]
public class Caracteristica
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("id_antigo")]
    public int? IdAntigo { get; set; }

    [Column("nome")]
    public string Nome { get; set; } = string.Empty;

    [Column("tipo")]
    public string? Tipo { get; set; }

    [Column("icone")]
    public string? Icone { get; set; }

    [Column("exibir")]
    public string? Exibir { get; set; }

    [Column("created_at")]
    public DateTime? CreatedAt { get; set; }

    [Column("updated_at")]
    public DateTime? UpdatedAt { get; set; }

    [Column("deleted_at")]
    public DateTime? DeletedAt { get; set; }
}
