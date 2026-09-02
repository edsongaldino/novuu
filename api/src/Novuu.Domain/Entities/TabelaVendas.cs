using System.Collections.Generic;

namespace Novuu.Domain.Entities;

public class TabelaVendas : BaseEntity
{
    public string Nome { get; set; } = string.Empty;
    public int ConstrutoraId { get; set; }
    public int EmpreendimentoId { get; set; }
    public int? TorreId { get; set; }
    public int? QuadraId { get; set; }
    public int TipoTabelaId { get; set; }
    public decimal? ValorVagaExtra { get; set; }
    public int? QtdeParcelasEntrada { get; set; }
    
    public ICollection<TabelaVendasBaloes> Baloes { get; set; } = new List<TabelaVendasBaloes>();
}
