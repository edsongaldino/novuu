using System.Collections.Generic;

namespace Novuu.Domain.Entities;

public class Construtora : BaseEntity
{
    public string Nome { get; set; } = string.Empty;
    public string? NomeAbreviado { get; set; }
    public string? RazaoSocial { get; set; }
    public string? Cnpj { get; set; }
    public string? Logo { get; set; }
    public string? Observacoes { get; set; }
    public string? TempoMercado { get; set; }
    public int? AnoFundacao { get; set; }
    public int? MesFundacao { get; set; }
    public string? Email { get; set; }
    public string? Telefone { get; set; }
    public string? CelularAtendimento { get; set; }
    public string? Whatsapp { get; set; }
    public string? UrlHotsite { get; set; }
    public string? Facebook { get; set; }
    public string? Instagram { get; set; }
    public string? Twitter { get; set; }
    public string? Youtube { get; set; }
    public string Status { get; set; } = "Liberada";
    public decimal? ValorMensal { get; set; }
    public bool AcessoDomus { get; set; }
    
    public ICollection<Empreendimento> Empreendimentos { get; set; } = new List<Empreendimento>();
    public ICollection<User> Users { get; set; } = new List<User>();
}
