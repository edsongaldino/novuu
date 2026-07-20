using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace LancamentosOnline.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddLeadsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "leads",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    construtora_id = table.Column<int>(type: "integer", nullable: false),
                    empreendimento_id = table.Column<int>(type: "integer", nullable: false),
                    nome = table.Column<string>(type: "text", nullable: false),
                    email = table.Column<string>(type: "text", nullable: true),
                    telefone = table.Column<string>(type: "text", nullable: true),
                    mensagem = table.Column<string>(type: "text", nullable: true),
                    previsao = table.Column<string>(type: "text", nullable: true),
                    interesse = table.Column<string>(type: "text", nullable: true),
                    renda = table.Column<string>(type: "text", nullable: true),
                    dispositivo = table.Column<string>(type: "text", nullable: true),
                    origem = table.Column<string>(type: "text", nullable: true),
                    tempo = table.Column<string>(type: "text", nullable: true),
                    status = table.Column<string>(type: "text", nullable: false),
                    created_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    updated_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("p_k_leads", x => x.id);
                    table.ForeignKey(
                        name: "f_k_leads_construtoras_construtora_id",
                        column: x => x.construtora_id,
                        principalTable: "construtoras",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "f_k_leads_empreendimentos_empreendimento_id",
                        column: x => x.empreendimento_id,
                        principalTable: "empreendimentos",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "i_x_leads_construtora_id",
                table: "leads",
                column: "construtora_id");

            migrationBuilder.CreateIndex(
                name: "i_x_leads_empreendimento_id",
                table: "leads",
                column: "empreendimento_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "leads");
        }
    }
}
