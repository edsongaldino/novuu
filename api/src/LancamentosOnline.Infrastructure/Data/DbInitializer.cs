using LancamentosOnline.Domain.Entities;
using System;
using System.Linq;

namespace LancamentosOnline.Infrastructure.Data;

public static class DbInitializer
{
    public static void Seed(ApplicationDbContext context)
    {
        context.Database.EnsureCreated();

        // 1. Seed Estado
        if (!context.Estados.Any())
        {
            var mt = new Estado { Uf = "MT", Nome = "Mato Grosso" };
            context.Estados.Add(mt);
            context.SaveChanges();
        }

        // 2. Seed Cidade
        if (!context.Cidades.Any())
        {
            var mt = context.Estados.First();
            var cuiaba = new Cidade { EstadoId = mt.Id, Nome = "Cuiabá" };
            context.Cidades.Add(cuiaba);
            context.SaveChanges();
        }

        // 3. Seed Bairros
        if (!context.Bairros.Any())
        {
            var cuiaba = context.Cidades.First();
            var centroSul = new Bairro { CidadeId = cuiaba.Id, Nome = "Centro-Sul" };
            var bosqueSaude = new Bairro { CidadeId = cuiaba.Id, Nome = "Bosque da Saúde" };
            var jardimAclimacao = new Bairro { CidadeId = cuiaba.Id, Nome = "Jardim Aclimação" };
            var jardimAmericas = new Bairro { CidadeId = cuiaba.Id, Nome = "Jardim das Américas" };
            context.Bairros.AddRange(centroSul, bosqueSaude, jardimAclimacao, jardimAmericas);
            context.SaveChanges();
        }

        // 4. Seed Construtoras
        if (!context.Construtoras.Any())
        {
            var plaenge = new Construtora { Nome = "Plaenge Empreendimentos", NomeAbreviado = "Plaenge", Cnpj = "00.000.000/0001-00", AcessoDomus = true };
            var ginco = new Construtora { Nome = "Ginco Urbanismo", NomeAbreviado = "Ginco", Cnpj = "11.111.111/0001-11", AcessoDomus = false };
            context.Construtoras.AddRange(plaenge, ginco);
            context.SaveChanges();
        }

        // 5. Seed Empreendimentos
        if (!context.Empreendimentos.Any())
        {
            var plaenge = context.Construtoras.First(c => c.NomeAbreviado == "Plaenge");
            var ginco = context.Construtoras.First(c => c.NomeAbreviado == "Ginco");

            var volare = new Empreendimento
            {
                ConstrutoraId = plaenge.Id,
                Nome = "Villaggio Volare",
                Descricao = "Apartamentos de alto padrão localizados no coração de Cuiabá, com ampla área de lazer.",
                Tipo = "Vertical",
                ValorInicial = 449500m,
                ValorFinal = 600000m,
                PrevisaoEntrega = "Entregue",
                QtdeTorre = 1,
                QtdeQuadra = 0,
                Status = "Liberado",
                GerouUnidades = true
            };

            var bravie = new Empreendimento
            {
                ConstrutoraId = plaenge.Id,
                Nome = "Bravie - Beyond Living",
                Descricao = "Um projeto inovador com sofisticação e conforto no Bosque da Saúde.",
                Tipo = "Vertical",
                ValorInicial = 961400m,
                ValorFinal = 1200000m,
                PrevisaoEntrega = "Dezembro 2026",
                QtdeTorre = 1,
                QtdeQuadra = 0,
                Status = "Liberado",
                GerouUnidades = true
            };

            var vox = new Empreendimento
            {
                ConstrutoraId = plaenge.Id,
                Nome = "VOX - Apartamentos",
                Descricao = "Viva o melhor de Cuiabá com estilo único no Jardim Aclimação.",
                Tipo = "Vertical",
                ValorInicial = 1457000m,
                ValorFinal = 1900000m,
                PrevisaoEntrega = "Junho 2027",
                QtdeTorre = 1,
                QtdeQuadra = 0,
                Status = "Liberado",
                GerouUnidades = true
            };

            var florais = new Empreendimento
            {
                ConstrutoraId = ginco.Id,
                Nome = "Florais dos Lagos",
                Descricao = "Condomínio horizontal de altíssimo padrão com lagos e natureza exuberante.",
                Tipo = "Horizontal",
                ValorInicial = 800000m,
                ValorFinal = 1500000m,
                PrevisaoEntrega = "Entregue",
                QtdeTorre = 0,
                QtdeQuadra = 5,
                Status = "Liberado",
                GerouUnidades = true
            };

            context.Empreendimentos.AddRange(volare, bravie, vox, florais);
            context.SaveChanges();
        }

        // 6. Seed Unidades
        if (!context.Unidades.Any())
        {
            var plaenge = context.Construtoras.First(c => c.NomeAbreviado == "Plaenge");
            var volare = context.Empreendimentos.First(e => e.Nome == "Villaggio Volare");
            var bravie = context.Empreendimentos.First(e => e.Nome == "Bravie - Beyond Living");
            var vox = context.Empreendimentos.First(e => e.Nome == "VOX - Apartamentos");

            var u1 = new Unidade { ConstrutoraId = plaenge.Id, EmpreendimentoId = volare.Id, Nome = "Apartamento 101", Situacao = "Disponível" };
            var u2 = new Unidade { ConstrutoraId = plaenge.Id, EmpreendimentoId = volare.Id, Nome = "Apartamento 102", Situacao = "Vendida" };
            var u3 = new Unidade { ConstrutoraId = plaenge.Id, EmpreendimentoId = bravie.Id, Nome = "Apartamento 201", Situacao = "Disponível" };
            var u4 = new Unidade { ConstrutoraId = plaenge.Id, EmpreendimentoId = vox.Id, Nome = "Apartamento 301", Situacao = "Disponível" };

            context.Unidades.AddRange(u1, u2, u3, u4);
            context.SaveChanges();
        }

        // 7. Seed Users
        if (!context.Users.Any())
        {
            var plaenge = context.Construtoras.First(c => c.NomeAbreviado == "Plaenge");
            var adminUser = new User
            {
                Name = "Administrador Plaenge",
                Email = "admin@lancamentos.online",
                PasswordHash = "admin123",
                Celular = "(65) 99999-1111",
                ConstrutoraId = plaenge.Id
            };
            context.Users.Add(adminUser);
            context.SaveChanges();
        }

        // 8. Seed Leads
        if (!context.Leads.Any())
        {
            var plaenge = context.Construtoras.First(c => c.NomeAbreviado == "Plaenge");
            var volare = context.Empreendimentos.First(e => e.Nome == "Villaggio Volare");
            var bravie = context.Empreendimentos.First(e => e.Nome == "Bravie - Beyond Living");
            var vox = context.Empreendimentos.First(e => e.Nome == "VOX - Apartamentos");

            var l1 = new Lead { ConstrutoraId = plaenge.Id, EmpreendimentoId = volare.Id, Nome = "Carlos Silva", Email = "carlos@email.com", Telefone = "(65) 99999-8888", Status = "Novo" };
            var l2 = new Lead { ConstrutoraId = plaenge.Id, EmpreendimentoId = bravie.Id, Nome = "Mariana Costa", Email = "mariana@email.com", Telefone = "(65) 98888-7777", Status = "Atendido" };
            var l3 = new Lead { ConstrutoraId = plaenge.Id, EmpreendimentoId = vox.Id, Nome = "Bruno Almeida", Email = "bruno@email.com", Telefone = "(65) 97777-6666", Status = "Proposta em Análise" };
            context.Leads.AddRange(l1, l2, l3);
            context.SaveChanges();
        }
    }
}
