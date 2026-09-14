using System.Collections.Generic;
using Novuu.Domain.Entities;

namespace Novuu.Application.DTOs;

public class FavoritoDto
{
    public int EmpreendimentoId { get; set; }
    public string? Nome { get; set; }
    public string? ImagemUrl { get; set; }
    // Outros campos relevantes para listar
}

public class HistoricoVisitaDto
{
    public int EmpreendimentoId { get; set; }
    public string? Nome { get; set; }
    public string? ImagemUrl { get; set; }
    public System.DateTime DataAcesso { get; set; }
}
