using Microsoft.EntityFrameworkCore;
using LancamentosOnline.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace LancamentosOnline.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Estado> Estados { get; }
    DbSet<Cidade> Cidades { get; }
    DbSet<Bairro> Bairros { get; }
    DbSet<Endereco> Enderecos { get; }
    DbSet<Construtora> Construtoras { get; }
    DbSet<Empreendimento> Empreendimentos { get; }
    DbSet<Torre> Torres { get; }
    DbSet<Quadra> Quadras { get; }
    DbSet<Andar> Andares { get; }
    DbSet<Unidade> Unidades { get; }
    DbSet<User> Users { get; }
    DbSet<Lead> Leads { get; }
    DbSet<Cliente> Clientes { get; }
    DbSet<Proposta> Propostas { get; }
    DbSet<PropostaBalao> PropostasBaloes { get; }
    DbSet<PropostaVaga> PropostasVagas { get; }
    DbSet<Garagem> Garagens { get; }
    DbSet<TabelaVendas> TabelaVendas { get; }
    DbSet<TabelaVendasBaloes> TabelaVendasBaloes { get; }
    DbSet<Foto> Fotos { get; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
