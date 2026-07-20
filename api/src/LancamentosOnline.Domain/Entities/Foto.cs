using System;

namespace LancamentosOnline.Domain.Entities;

public class Foto
{
    public int Id { get; set; }
    public int? ConstrutoraId { get; set; }
    public int? EmpreendimentoId { get; set; }
    public int? PlantaId { get; set; }
    public string? Nome { get; set; }
    public string? Descricao { get; set; }
    public string? Arquivo { get; set; }
    public string? Extensao { get; set; }
    public string? Tipo { get; set; }
    public string? Status { get; set; }
    public DateTime? CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
    public string? DestaquePrincipal { get; set; }
    public string? DestaqueCarrossel { get; set; }
    public string? DestaquePlanta { get; set; }
}
