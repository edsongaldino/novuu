using System.Collections.Generic;

namespace LancamentosOnline.Application.DTOs;

public class CreatePropostaRequest
{
    public int UnidadeId { get; set; }
    public CreateClienteDto Cliente { get; set; } = null!;
    public decimal ValorProposta { get; set; }
    public decimal EntradaProposta { get; set; }
    public int? QuantidadeParcela { get; set; }
    public decimal? ValorParcela { get; set; }
    public decimal? ValorBens { get; set; }
    public List<CreatePropostaBalaoDto>? Baloes { get; set; }
}
