using LancamentosOnline.Domain.Entities;
using Bogus;
using System;
using System.Linq;
using System.Collections.Generic;

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
        var estadoMt = context.Estados.First();

        // 2. Seed Cidade
        if (!context.Cidades.Any())
        {
            var cuiaba = new Cidade { EstadoId = estadoMt.Id, Nome = "Cuiabá" };
            var vg = new Cidade { EstadoId = estadoMt.Id, Nome = "Várzea Grande" };
            var rondonopolis = new Cidade { EstadoId = estadoMt.Id, Nome = "Rondonópolis" };
            var sinop = new Cidade { EstadoId = estadoMt.Id, Nome = "Sinop" };
            context.Cidades.AddRange(cuiaba, vg, rondonopolis, sinop);
            context.SaveChanges();
        }
        var cidades = context.Cidades.ToList();

        // 3. Seed Bairros
        if (!context.Bairros.Any())
        {
            var bairros = new List<Bairro>();
            var nomesBairrosCuiaba = new[] { "Centro-Sul", "Bosque da Saúde", "Jardim Aclimação", "Jardim das Américas", "Goiabeiras", "Quilombo", "Santa Rosa", "Popular", "Alvorada", "Boa Esperança", "Jardim Itália", "Morada do Ouro", "Coxipó" };
            var cuiaba = cidades.First(c => c.Nome == "Cuiabá");
            foreach (var nb in nomesBairrosCuiaba) bairros.Add(new Bairro { CidadeId = cuiaba.Id, Nome = nb });
            
            var nomesBairrosVG = new[] { "Centro", "Jardim Aeroporto", "Cristo Rei", "Jardim Glória", "Nova Várzea Grande", "Mapim" };
            var vg = cidades.First(c => c.Nome == "Várzea Grande");
            foreach (var nb in nomesBairrosVG) bairros.Add(new Bairro { CidadeId = vg.Id, Nome = nb });

            context.Bairros.AddRange(bairros);
            context.SaveChanges();
        }
        var bairrosDb = context.Bairros.ToList();

        // 4. Seed Construtoras
        if (!context.Construtoras.Any())
        {
            var construtoras = new List<Construtora>
            {
                new Construtora { Nome = "Plaenge Empreendimentos", NomeAbreviado = "Plaenge", Cnpj = "00.000.000/0001-00", AcessoDomus = true },
                new Construtora { Nome = "Ginco Urbanismo", NomeAbreviado = "Ginco", Cnpj = "11.111.111/0001-11", AcessoDomus = false },
                new Construtora { Nome = "MRV Engenharia", NomeAbreviado = "MRV", Cnpj = "22.222.222/0001-22", AcessoDomus = false },
                new Construtora { Nome = "São Benedito", NomeAbreviado = "São Benedito", Cnpj = "33.333.333/0001-33", AcessoDomus = false },
                new Construtora { Nome = "Vanguard Home", NomeAbreviado = "Vanguard", Cnpj = "44.444.444/0001-44", AcessoDomus = true },
                new Construtora { Nome = "Cyrela", NomeAbreviado = "Cyrela", Cnpj = "55.555.555/0001-55", AcessoDomus = false },
                new Construtora { Nome = "Gafisa", NomeAbreviado = "Gafisa", Cnpj = "66.666.666/0001-66", AcessoDomus = false },
                new Construtora { Nome = "Tenda", NomeAbreviado = "Tenda", Cnpj = "77.777.777/0001-77", AcessoDomus = false },
                new Construtora { Nome = "Direcional", NomeAbreviado = "Direcional", Cnpj = "88.888.888/0001-88", AcessoDomus = false },
                new Construtora { Nome = "Even", NomeAbreviado = "Even", Cnpj = "99.999.999/0001-99", AcessoDomus = false },
                new Construtora { Nome = "Gerencial Construtora", NomeAbreviado = "Gerencial", Cnpj = "12.345.678/0001-10", AcessoDomus = false }
            };
            context.Construtoras.AddRange(construtoras);
            context.SaveChanges();
        }
        var construtorasDb = context.Construtoras.ToList();

        // 5. Seed Empreendimentos (Bogus)
        if (!context.Empreendimentos.Any())
        {
            var faker = new Faker("pt_BR");
            
            var prefixosNomes = new[] { "Residencial", "Edifício", "Condomínio", "Parque", "Vila", "Torre", "Complexo", "Plaza", "Jardim", "Spazio", "Ville", "Maison" };
            var sufixosNomes = new[] { "Borges", "Di Roma", "Bravie", "Garden", "Lagos", "das Flores", "do Sol", "Imperial", "Real", "Prime", "Premium", "Unique", "Vision", "Horizon", "Acqua", "Natura", "Bela Vista", "Oasis", "Paradiso", "Exclusive", "Central", "Lumina" };
            
            var tipos = new[] { "Vertical", "Horizontal", "Loteamento" };
            var statusOpcoes = new[] { "Lançamento", "Na Planta", "Em Obras", "Pronto", "Entregue" };
            
            var empreendimentosGerados = new List<Empreendimento>();

            for (int i = 0; i < 350; i++)
            {
                var tipoSelecionado = faker.PickRandom(tipos);
                
                decimal valorBase = 0;
                decimal valorMax = 0;
                
                if (tipoSelecionado == "Loteamento") {
                    valorBase = faker.Random.Number(100000, 300000);
                    valorMax = faker.Random.Number((int)valorBase + 50000, (int)valorBase + 200000);
                } else if (tipoSelecionado == "Horizontal") {
                    valorBase = faker.Random.Number(500000, 2000000);
                    valorMax = faker.Random.Number((int)valorBase + 200000, (int)valorBase + 1500000);
                } else {
                    valorBase = faker.Random.Number(300000, 1500000);
                    valorMax = faker.Random.Number((int)valorBase + 100000, (int)valorBase + 2000000);
                }

                string prevEntrega = faker.PickRandom(statusOpcoes);
                if (prevEntrega != "Entregue" && prevEntrega != "Pronto")
                {
                    prevEntrega = faker.Date.Future(3).ToString("MM/yyyy");
                }

                var emp = new Empreendimento
                {
                    ConstrutoraId = faker.PickRandom(construtorasDb).Id,
                    Nome = $"{faker.PickRandom(prefixosNomes)} {faker.PickRandom(sufixosNomes)} {faker.Name.LastName()}",
                    Descricao = faker.Lorem.Paragraphs(2),
                    Tipo = tipoSelecionado,
                    ValorInicial = valorBase,
                    ValorFinal = valorMax,
                    PrevisaoEntrega = prevEntrega,
                    QtdeTorre = tipoSelecionado == "Vertical" ? faker.Random.Number(1, 5) : 0,
                    QtdeQuadra = tipoSelecionado != "Vertical" ? faker.Random.Number(2, 20) : 0,
                    Status = faker.PickRandom(new[] { "Liberado", "Em Análise", "Bloqueado", "Liberado", "Liberado" }), // Mais chance de liberado
                    GerouUnidades = faker.Random.Bool()
                };
                empreendimentosGerados.Add(emp);
            }

            context.Empreendimentos.AddRange(empreendimentosGerados);
            context.SaveChanges();
        }
        
        var empreendimentosDb = context.Empreendimentos.ToList();

        // 6. Seed Unidades
        if (!context.Unidades.Any())
        {
            var faker = new Faker("pt_BR");
            var unidades = new List<Unidade>();
            
            // Gerar unidades para uma parte dos empreendimentos
            foreach (var emp in empreendimentosDb.Take(100))
            {
                if (emp.GerouUnidades)
                {
                    int qtd = faker.Random.Number(3, 10);
                    for (int i = 0; i < qtd; i++)
                    {
                        unidades.Add(new Unidade {
                            ConstrutoraId = emp.ConstrutoraId,
                            EmpreendimentoId = emp.Id,
                            Nome = emp.Tipo == "Vertical" ? $"Apt {faker.Random.Number(1, 25)}0{faker.Random.Number(1, 8)}" : $"Lote {faker.Random.Number(1, 50)} Qd {faker.Random.Number(1, 10)}",
                            Situacao = faker.PickRandom(new[] { "Disponível", "Disponível", "Vendida", "Reservada", "Bloqueada" })
                        });
                    }
                }
            }
            context.Unidades.AddRange(unidades);
            context.SaveChanges();
        }

        // 7. Seed Users
        if (!context.Users.Any())
        {
            var plaenge = construtorasDb.FirstOrDefault(c => c.NomeAbreviado == "Plaenge") ?? construtorasDb.First();
            var adminUser = new User
            {
                Name = "Administrador",
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
            var faker = new Faker("pt_BR");
            var leads = new List<Lead>();
            
            foreach (var emp in empreendimentosDb.Take(50))
            {
                int qtd = faker.Random.Number(1, 8);
                for (int i = 0; i < qtd; i++)
                {
                    leads.Add(new Lead {
                        ConstrutoraId = emp.ConstrutoraId,
                        EmpreendimentoId = emp.Id,
                        Nome = faker.Name.FullName(),
                        Email = faker.Internet.Email(),
                        Telefone = faker.Phone.PhoneNumber("(##) 9####-####"),
                        Status = faker.PickRandom(new[] { "Novo", "Em Atendimento", "Agendou Visita", "Proposta em Análise", "Venda Fechada", "Perdido" })
                    });
                }
            }
            context.Leads.AddRange(leads);
            context.SaveChanges();
        }
    }
}
