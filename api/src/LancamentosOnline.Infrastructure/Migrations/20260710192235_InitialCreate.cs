using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LancamentosOnline.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "clientes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "text", nullable: false),
                    cpf = table.Column<string>(type: "text", nullable: false),
                    data_nascimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    email = table.Column<string>(type: "text", nullable: true),
                    telefone = table.Column<string>(type: "text", nullable: true),
                    estado_civil = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_clientes", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "construtoras",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "text", nullable: false),
                    nome_abreviado = table.Column<string>(type: "text", nullable: true),
                    cnpj = table.Column<string>(type: "text", nullable: true),
                    ano_fundacao = table.Column<int>(type: "integer", nullable: true),
                    mes_fundacao = table.Column<int>(type: "integer", nullable: true),
                    status = table.Column<string>(type: "text", nullable: false),
                    valor_mensal = table.Column<decimal>(type: "numeric", nullable: true),
                    acesso_domus = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_construtoras", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "enderecos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    construtora_id = table.Column<int>(type: "integer", nullable: true),
                    estado_id = table.Column<int>(type: "integer", nullable: false),
                    cidade_id = table.Column<int>(type: "integer", nullable: false),
                    bairro_id = table.Column<int>(type: "integer", nullable: false),
                    cep = table.Column<string>(type: "text", nullable: false),
                    logradouro = table.Column<string>(type: "text", nullable: false),
                    complemento = table.Column<string>(type: "text", nullable: true),
                    numero = table.Column<string>(type: "text", nullable: true),
                    latitude = table.Column<decimal>(type: "numeric", nullable: true),
                    longitude = table.Column<decimal>(type: "numeric", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_enderecos", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "estados",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    uf = table.Column<string>(type: "text", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_estados", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "garagens",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    empreendimento_id = table.Column<int>(type: "integer", nullable: false),
                    construtora_id = table.Column<int>(type: "integer", nullable: false),
                    torre_id = table.Column<int>(type: "integer", nullable: true),
                    unidade_id = table.Column<int>(type: "integer", nullable: true),
                    pavimento_garagem_id = table.Column<int>(type: "integer", nullable: true),
                    nome = table.Column<string>(type: "text", nullable: false),
                    situacao = table.Column<string>(type: "text", nullable: false),
                    formato_vaga = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_garagens", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tabela_vendas",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "text", nullable: false),
                    construtora_id = table.Column<int>(type: "integer", nullable: false),
                    empreendimento_id = table.Column<int>(type: "integer", nullable: false),
                    torre_id = table.Column<int>(type: "integer", nullable: true),
                    quadra_id = table.Column<int>(type: "integer", nullable: true),
                    tipo_tabela_id = table.Column<int>(type: "integer", nullable: false),
                    valor_vaga_extra = table.Column<decimal>(type: "numeric", nullable: true),
                    qtde_parcelas_entrada = table.Column<int>(type: "integer", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_tabela_vendas", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "empreendimentos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    construtora_id = table.Column<int>(type: "integer", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: false),
                    descricao = table.Column<string>(type: "text", nullable: true),
                    tipo = table.Column<string>(type: "text", nullable: false),
                    valor_inicial = table.Column<decimal>(type: "numeric", nullable: true),
                    valor_final = table.Column<decimal>(type: "numeric", nullable: true),
                    previsao_entrega = table.Column<string>(type: "text", nullable: true),
                    qtde_torre = table.Column<int>(type: "integer", nullable: false),
                    qtde_quadra = table.Column<int>(type: "integer", nullable: false),
                    latitude = table.Column<decimal>(type: "numeric", nullable: true),
                    longitude = table.Column<decimal>(type: "numeric", nullable: true),
                    status = table.Column<string>(type: "text", nullable: false),
                    gerou_unidades = table.Column<bool>(type: "boolean", nullable: false),
                    logomarca = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_empreendimentos", x => x.id);
                    table.ForeignKey(
                        name: "f_k_empreendimentos_construtoras_construtora_id",
                        column: x => x.construtora_id,
                        principalTable: "construtoras",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "users",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    name = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: false),
                    data_nascimento = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    foto_perfil = table.Column<string>(type: "text", nullable: true),
                    celular = table.Column<string>(type: "text", nullable: true),
                    telefone_fixo = table.Column<string>(type: "text", nullable: true),
                    whatsapp = table.Column<string>(type: "text", nullable: true),
                    perfil_profissional = table.Column<string>(type: "text", nullable: true),
                    construtora_id = table.Column<int>(type: "integer", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_users", x => x.id);
                    table.ForeignKey(
                        name: "f_k_users_construtoras_construtora_id",
                        column: x => x.construtora_id,
                        principalTable: "construtoras",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "cidades",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    estado_id = table.Column<int>(type: "integer", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_cidades", x => x.id);
                    table.ForeignKey(
                        name: "f_k_cidades__estados_estado_id",
                        column: x => x.estado_id,
                        principalTable: "estados",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tabela_vendas_baloes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    tabela_vendas_id = table.Column<int>(type: "integer", nullable: false),
                    percentual_balao = table.Column<decimal>(type: "numeric", nullable: false),
                    data_balao = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_tabela_vendas_baloes", x => x.id);
                    table.ForeignKey(
                        name: "f_k_tabela_vendas_baloes_tabela_vendas_tabela_vendas_id",
                        column: x => x.tabela_vendas_id,
                        principalTable: "tabela_vendas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "quadras",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    empreendimento_id = table.Column<int>(type: "integer", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: false),
                    total_unidades = table.Column<int>(type: "integer", nullable: false),
                    previsao_entrega = table.Column<string>(type: "text", nullable: true),
                    nomenclatura = table.Column<string>(type: "text", nullable: true),
                    observacoes = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "text", nullable: false),
                    gerou_unidades = table.Column<bool>(type: "boolean", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_quadras", x => x.id);
                    table.ForeignKey(
                        name: "f_k_quadras_empreendimentos_empreendimento_id",
                        column: x => x.empreendimento_id,
                        principalTable: "empreendimentos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "torres",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    nome = table.Column<string>(type: "text", nullable: false),
                    construtora_id = table.Column<int>(type: "integer", nullable: false),
                    empreendimento_id = table.Column<int>(type: "integer", nullable: false),
                    previsao_entrega = table.Column<string>(type: "text", nullable: true),
                    etapa = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "text", nullable: false),
                    observacoes = table.Column<string>(type: "text", nullable: true),
                    previsao_entrega_ano = table.Column<int>(type: "integer", nullable: true),
                    previsao_entrega_mes = table.Column<int>(type: "integer", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_torres", x => x.id);
                    table.ForeignKey(
                        name: "f_k_torres_empreendimentos_empreendimento_id",
                        column: x => x.empreendimento_id,
                        principalTable: "empreendimentos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "bairros",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cidade_id = table.Column<int>(type: "integer", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_bairros", x => x.id);
                    table.ForeignKey(
                        name: "f_k_bairros__cidades_cidade_id",
                        column: x => x.cidade_id,
                        principalTable: "cidades",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "andares",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    construtora_id = table.Column<int>(type: "integer", nullable: false),
                    torre_id = table.Column<int>(type: "integer", nullable: false),
                    numero = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_andares", x => x.id);
                    table.ForeignKey(
                        name: "f_k_andares__torres_torre_id",
                        column: x => x.torre_id,
                        principalTable: "torres",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "unidades",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    construtora_id = table.Column<int>(type: "integer", nullable: false),
                    empreendimento_id = table.Column<int>(type: "integer", nullable: false),
                    torre_id = table.Column<int>(type: "integer", nullable: true),
                    quadra_id = table.Column<int>(type: "integer", nullable: true),
                    andar_id = table.Column<int>(type: "integer", nullable: true),
                    planta_id = table.Column<int>(type: "integer", nullable: true),
                    nome = table.Column<string>(type: "text", nullable: false),
                    situacao = table.Column<string>(type: "text", nullable: false),
                    status = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_unidades", x => x.id);
                    table.ForeignKey(
                        name: "f_k_unidades_andares_andar_id",
                        column: x => x.andar_id,
                        principalTable: "andares",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "f_k_unidades_quadras_quadra_id",
                        column: x => x.quadra_id,
                        principalTable: "quadras",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "f_k_unidades_torres_torre_id",
                        column: x => x.torre_id,
                        principalTable: "torres",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "propostas",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    construtora_id = table.Column<int>(type: "integer", nullable: false),
                    empreendimento_id = table.Column<int>(type: "integer", nullable: false),
                    unidade_id = table.Column<int>(type: "integer", nullable: false),
                    oferta_id = table.Column<int>(type: "integer", nullable: true),
                    cliente_id = table.Column<int>(type: "integer", nullable: false),
                    valor_proposta = table.Column<decimal>(type: "numeric", nullable: false),
                    entrada_proposta = table.Column<decimal>(type: "numeric", nullable: false),
                    quantidade_parcela = table.Column<int>(type: "integer", nullable: true),
                    valor_parcela = table.Column<decimal>(type: "numeric", nullable: true),
                    saldo_remanescente = table.Column<decimal>(type: "numeric", nullable: true),
                    valor_bens = table.Column<decimal>(type: "numeric", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_propostas", x => x.id);
                    table.ForeignKey(
                        name: "f_k_propostas__unidades_unidade_id",
                        column: x => x.unidade_id,
                        principalTable: "unidades",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "f_k_propostas_clientes_cliente_id",
                        column: x => x.cliente_id,
                        principalTable: "clientes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "propostas_baloes",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    proposta_id = table.Column<int>(type: "integer", nullable: false),
                    valor = table.Column<decimal>(type: "numeric", nullable: false),
                    data = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_propostas_baloes", x => x.id);
                    table.ForeignKey(
                        name: "f_k_propostas_baloes_propostas_proposta_id",
                        column: x => x.proposta_id,
                        principalTable: "propostas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "propostas_vagas",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    proposta_id = table.Column<int>(type: "integer", nullable: false),
                    garagem_id = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_propostas_vagas", x => x.id);
                    table.ForeignKey(
                        name: "f_k_propostas_vagas_garagens_garagem_id",
                        column: x => x.garagem_id,
                        principalTable: "garagens",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "f_k_propostas_vagas_propostas_proposta_id",
                        column: x => x.proposta_id,
                        principalTable: "propostas",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "i_x_andares_torre_id",
                table: "andares",
                column: "torre_id");

            migrationBuilder.CreateIndex(
                name: "i_x_bairros_cidade_id",
                table: "bairros",
                column: "cidade_id");

            migrationBuilder.CreateIndex(
                name: "i_x_cidades_estado_id",
                table: "cidades",
                column: "estado_id");

            migrationBuilder.CreateIndex(
                name: "i_x_empreendimentos_construtora_id",
                table: "empreendimentos",
                column: "construtora_id");

            migrationBuilder.CreateIndex(
                name: "i_x_propostas_cliente_id",
                table: "propostas",
                column: "cliente_id");

            migrationBuilder.CreateIndex(
                name: "i_x_propostas_unidade_id",
                table: "propostas",
                column: "unidade_id");

            migrationBuilder.CreateIndex(
                name: "i_x_propostas_baloes_proposta_id",
                table: "propostas_baloes",
                column: "proposta_id");

            migrationBuilder.CreateIndex(
                name: "i_x_propostas_vagas_garagem_id",
                table: "propostas_vagas",
                column: "garagem_id");

            migrationBuilder.CreateIndex(
                name: "i_x_propostas_vagas_proposta_id",
                table: "propostas_vagas",
                column: "proposta_id");

            migrationBuilder.CreateIndex(
                name: "i_x_quadras_empreendimento_id",
                table: "quadras",
                column: "empreendimento_id");

            migrationBuilder.CreateIndex(
                name: "i_x_tabela_vendas_baloes_tabela_vendas_id",
                table: "tabela_vendas_baloes",
                column: "tabela_vendas_id");

            migrationBuilder.CreateIndex(
                name: "i_x_torres_empreendimento_id",
                table: "torres",
                column: "empreendimento_id");

            migrationBuilder.CreateIndex(
                name: "i_x_unidades_andar_id",
                table: "unidades",
                column: "andar_id");

            migrationBuilder.CreateIndex(
                name: "i_x_unidades_quadra_id",
                table: "unidades",
                column: "quadra_id");

            migrationBuilder.CreateIndex(
                name: "i_x_unidades_torre_id",
                table: "unidades",
                column: "torre_id");

            migrationBuilder.CreateIndex(
                name: "i_x_users_construtora_id",
                table: "users",
                column: "construtora_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "bairros");

            migrationBuilder.DropTable(
                name: "enderecos");

            migrationBuilder.DropTable(
                name: "propostas_baloes");

            migrationBuilder.DropTable(
                name: "propostas_vagas");

            migrationBuilder.DropTable(
                name: "tabela_vendas_baloes");

            migrationBuilder.DropTable(
                name: "users");

            migrationBuilder.DropTable(
                name: "cidades");

            migrationBuilder.DropTable(
                name: "garagens");

            migrationBuilder.DropTable(
                name: "propostas");

            migrationBuilder.DropTable(
                name: "tabela_vendas");

            migrationBuilder.DropTable(
                name: "estados");

            migrationBuilder.DropTable(
                name: "unidades");

            migrationBuilder.DropTable(
                name: "clientes");

            migrationBuilder.DropTable(
                name: "andares");

            migrationBuilder.DropTable(
                name: "quadras");

            migrationBuilder.DropTable(
                name: "torres");

            migrationBuilder.DropTable(
                name: "empreendimentos");

            migrationBuilder.DropTable(
                name: "construtoras");
        }
    }
}
