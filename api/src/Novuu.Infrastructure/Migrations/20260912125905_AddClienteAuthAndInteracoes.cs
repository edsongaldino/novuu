using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Novuu.Infrastructure.Migrations
{
    public partial class AddClienteAuthAndInteracoes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "foto_url",
                table: "clientes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "google_id",
                table: "clientes",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "senha_hash",
                table: "clientes",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "favoritos",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cliente_id = table.Column<int>(type: "integer", nullable: false),
                    empreendimento_id = table.Column<int>(type: "integer", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_favoritos", x => x.id);
                    table.ForeignKey(
                        name: "fk_favoritos_clientes_cliente_id",
                        column: x => x.cliente_id,
                        principalTable: "clientes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_favoritos_empreendimentos_empreendimento_id",
                        column: x => x.empreendimento_id,
                        principalTable: "empreendimentos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "historico_visitas",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    cliente_id = table.Column<int>(type: "integer", nullable: false),
                    empreendimento_id = table.Column<int>(type: "integer", nullable: false),
                    data_acesso = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_historico_visitas", x => x.id);
                    table.ForeignKey(
                        name: "fk_historico_visitas_clientes_cliente_id",
                        column: x => x.cliente_id,
                        principalTable: "clientes",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_historico_visitas_empreendimentos_empreendimento_id",
                        column: x => x.empreendimento_id,
                        principalTable: "empreendimentos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_favoritos_cliente_id",
                table: "favoritos",
                column: "cliente_id");

            migrationBuilder.CreateIndex(
                name: "ix_favoritos_empreendimento_id",
                table: "favoritos",
                column: "empreendimento_id");

            migrationBuilder.CreateIndex(
                name: "ix_historico_visitas_cliente_id",
                table: "historico_visitas",
                column: "cliente_id");

            migrationBuilder.CreateIndex(
                name: "ix_historico_visitas_empreendimento_id",
                table: "historico_visitas",
                column: "empreendimento_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "favoritos");

            migrationBuilder.DropTable(
                name: "historico_visitas");

            migrationBuilder.DropColumn(
                name: "foto_url",
                table: "clientes");

            migrationBuilder.DropColumn(
                name: "google_id",
                table: "clientes");

            migrationBuilder.DropColumn(
                name: "senha_hash",
                table: "clientes");
        }
    }
}
