using System;

namespace Novuu.Domain.Entities;

public class TabelaVendasBaloes : BaseEntity
{
    public int TabelaVendasId { get; set; }
    public TabelaVendas TabelaVendas { get; set; } = null!;
    public decimal PercentualBalao { get; set; }
    public DateTime DataBalao { get; set; }
}
