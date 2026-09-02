using Microsoft.EntityFrameworkCore;
using Novuu.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace Novuu.Application.Interfaces;

public interface IApplicationDbContext
{
    DbSet<Estado> Estados { get; }
    DbSet<Cidade> Cidades { get; }
    DbSet<Bairro> Bairros { get; }
    DbSet<Endereco> Enderecos { get; }
    DbSet<Construtora> Construtoras { get; }
    DbSet<EmpreendimentoSubtipo> Subtipos { get; }
    DbSet<EmpreendimentoVariacao> Variacoes { get; }
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
    DbSet<Planta> Plantas { get; }
    DbSet<Caracteristica> Caracteristicas { get; }
    DbSet<CaracteristicaEmpreendimento> CaracteristicasEmpreendimentos { get; }
    DbSet<CaracteristicaPlanta> CaracteristicasPlantas { get; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
