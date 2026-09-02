using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Novuu.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabaseSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "celular_atendimento",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "email",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "facebook",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "instagram",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "logo",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "observacoes",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "razao_social",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "telefone",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "tempo_mercado",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "twitter",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "url_hotsite",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "whatsapp",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "youtube",
                table: "construtoras",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "plantas",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    construtora_id = table.Column<int>(type: "integer", nullable: false),
                    empreendimento_id = table.Column<int>(type: "integer", nullable: false),
                    torre_id = table.Column<int>(type: "integer", nullable: true),
                    nome = table.Column<string>(type: "text", nullable: true),
                    observacoes = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "text", nullable: true),
                    area_privativa = table.Column<decimal>(type: "numeric", nullable: true),
                    qtd_dormitorio = table.Column<int>(type: "integer", nullable: true),
                    qtd_suite = table.Column<int>(type: "integer", nullable: true),
                    qtd_banheiro = table.Column<int>(type: "integer", nullable: true),
                    vagas_garagem = table.Column<int>(type: "integer", nullable: true),
                    planta_tipo = table.Column<string>(type: "text", nullable: true),
                    foto_planta = table.Column<int>(type: "integer", nullable: true),
                    foto_primeira_planta = table.Column<int>(type: "integer", nullable: true),
                    foto_segunda_planta = table.Column<int>(type: "integer", nullable: true),
                    foto_terceira_planta = table.Column<int>(type: "integer", nullable: true),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_plantas", x => x.id);
                    table.ForeignKey(
                        name: "f_k_plantas_construtoras_construtora_id",
                        column: x => x.construtora_id,
                        principalTable: "construtoras",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "f_k_plantas_empreendimentos_empreendimento_id",
                        column: x => x.empreendimento_id,
                        principalTable: "empreendimentos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            // Table 'fotos' already exists in database

            migrationBuilder.CreateIndex(
                name: "i_x_plantas_construtora_id",
                table: "plantas",
                column: "construtora_id");

            migrationBuilder.CreateIndex(
                name: "i_x_plantas_empreendimento_id",
                table: "plantas",
                column: "empreendimento_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "fotos");

            migrationBuilder.DropTable(
                name: "plantas");

            migrationBuilder.DropColumn(
                name: "celular_atendimento",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "email",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "facebook",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "instagram",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "logo",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "observacoes",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "razao_social",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "telefone",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "tempo_mercado",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "twitter",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "url_hotsite",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "whatsapp",
                table: "construtoras");

            migrationBuilder.DropColumn(
                name: "youtube",
                table: "construtoras");
        }
    }
}
