using System.Collections.Generic;

namespace LancamentosOnline.Domain.Entities;

public class Construtora : BaseEntity
{
    public string Nome { get; set; } = string.Empty;
    public string? NomeAbreviado { get; set; }
    public string? Cnpj { get; set; }
    public int? AnoFundacao { get; set; }
    public int? MesFundacao { get; set; }
    public string Status { get; set; } = "Liberada";
    public decimal? ValorMensal { get; set; }
    public bool AcessoDomus { get; set; }
    
    public ICollection<Empreendimento> Empreendimentos { get; set; } = new List<Empreendimento>();
    public ICollection<User> Users { get; set; } = new List<User>();
}
