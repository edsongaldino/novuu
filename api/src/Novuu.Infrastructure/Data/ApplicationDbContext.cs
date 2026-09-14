using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Novuu.Domain.Entities;
using Novuu.Application.Interfaces;
using System.Text.RegularExpressions;

namespace Novuu.Infrastructure.Data;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<Estado> Estados => Set<Estado>();
    public DbSet<Cidade> Cidades => Set<Cidade>();
    public DbSet<Bairro> Bairros => Set<Bairro>();
    public DbSet<Endereco> Enderecos => Set<Endereco>();
    public DbSet<Construtora> Construtoras => Set<Construtora>();
    public DbSet<EmpreendimentoSubtipo> Subtipos => Set<EmpreendimentoSubtipo>();
    public DbSet<EmpreendimentoVariacao> Variacoes => Set<EmpreendimentoVariacao>();
    public DbSet<Empreendimento> Empreendimentos => Set<Empreendimento>();
    public DbSet<Torre> Torres => Set<Torre>();
    public DbSet<Quadra> Quadras => Set<Quadra>();
    public DbSet<Andar> Andares => Set<Andar>();
    public DbSet<Unidade> Unidades => Set<Unidade>();
    public DbSet<User> Users => Set<User>();
    public DbSet<Lead> Leads => Set<Lead>();
    public DbSet<Cliente> Clientes => Set<Cliente>();
    public DbSet<Favorito> Favoritos => Set<Favorito>();
    public DbSet<HistoricoVisita> HistoricoVisitas => Set<HistoricoVisita>();
    public DbSet<Proposta> Propostas => Set<Proposta>();
    public DbSet<PropostaBalao> PropostasBaloes => Set<PropostaBalao>();
    public DbSet<PropostaVaga> PropostasVagas => Set<PropostaVaga>();
    public DbSet<Garagem> Garagens => Set<Garagem>();
    public DbSet<TabelaVendas> TabelaVendas => Set<TabelaVendas>();
    public DbSet<TabelaVendasBaloes> TabelaVendasBaloes => Set<TabelaVendasBaloes>();
    public DbSet<Foto> Fotos => Set<Foto>();
    public DbSet<Planta> Plantas => Set<Planta>();
    public DbSet<Caracteristica> Caracteristicas => Set<Caracteristica>();
    public DbSet<CaracteristicaEmpreendimento> CaracteristicasEmpreendimentos => Set<CaracteristicaEmpreendimento>();
    public DbSet<CaracteristicaPlanta> CaracteristicasPlantas => Set<CaracteristicaPlanta>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<EmpreendimentoSubtipo>()
            .ToTable("empreendimentos_subtipos");

        modelBuilder.Entity<EmpreendimentoVariacao>()
            .ToTable("empreendimentos_variacoes");

        modelBuilder.Entity<CaracteristicaEmpreendimento>()
            .HasKey(ce => new { ce.CaracteristicaId, ce.EmpreendimentoId });

        modelBuilder.Entity<CaracteristicaPlanta>()
            .HasKey(cp => new { cp.CaracteristicaId, cp.PlantaId });

        // Configure snake_case naming convention for all tables and columns
        foreach (var entity in modelBuilder.Model.GetEntityTypes())
        {
            var tableName = entity.GetTableName();
            if (tableName != null)
            {
                entity.SetTableName(ConvertToSnakeCase(tableName));
            }

            foreach (var property in entity.GetProperties())
            {
                var storeObjectIdentifier = StoreObjectIdentifier.Table(entity.GetTableName() ?? "", entity.GetSchema());
                var columnName = property.GetColumnName(storeObjectIdentifier);
                if (columnName != null)
                {
                    property.SetColumnName(ConvertToSnakeCase(columnName));
                }
            }

            foreach (var key in entity.GetKeys())
            {
                var keyName = key.GetName();
                if (keyName != null)
                {
                    key.SetName(ConvertToSnakeCase(keyName));
                }
            }

            foreach (var foreignKey in entity.GetForeignKeys())
            {
                var fkName = foreignKey.GetConstraintName();
                if (fkName != null)
                {
                    foreignKey.SetConstraintName(ConvertToSnakeCase(fkName));
                }
            }

            foreach (var index in entity.GetIndexes())
            {
                var indexName = index.GetDatabaseName();
                if (indexName != null)
                {
                    index.SetDatabaseName(ConvertToSnakeCase(indexName));
                }
            }
        }
    }

    private static string ConvertToSnakeCase(string input)
    {
        if (string.IsNullOrEmpty(input)) return input;

        var startWithLower = char.ToLowerInvariant(input[0]).ToString();
        var tail = input[1..];
        var snakeCase = Regex.Replace(tail, @"[A-Z]", m => "_" + m.Value.ToLowerInvariant());
        return startWithLower + snakeCase;
    }
}
