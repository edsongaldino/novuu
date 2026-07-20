using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using LancamentosOnline.Application.DTOs;
using LancamentosOnline.Application.Interfaces;
using LancamentosOnline.Domain.Entities;

namespace LancamentosOnline.Application.Services;

public class PropostaService : IPropostaService
{
    private readonly IApplicationDbContext _context;

    public PropostaService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Proposta> CreatePropostaAsync(CreatePropostaRequest request)
    {
        var unidade = await _context.Unidades
            .FirstOrDefaultAsync(u => u.Id == request.UnidadeId);
            
        if (unidade == null)
        {
            throw new Exception("Unidade nÃ£o encontrada.");
        }

        var cliente = await _context.Clientes
            .FirstOrDefaultAsync(c => c.Cpf == request.Cliente.Cpf);

        if (cliente == null)
        {
            cliente = new Cliente
            {
                Nome = request.Cliente.Nome,
                Cpf = request.Cliente.Cpf,
                Email = request.Cliente.Email,
                Telefone = request.Cliente.Telefone,
                DataNascimento = request.Cliente.DataNascimento,
                EstadoCivil = request.Cliente.EstadoCivil
            };
            _context.Clientes.Add(cliente);
            await _context.SaveChangesAsync();
        }

        var proposta = new Proposta
        {
            ConstrutoraId = unidade.ConstrutoraId,
            EmpreendimentoId = unidade.EmpreendimentoId,
            UnidadeId = unidade.Id,
            ClienteId = cliente.Id,
            ValorProposta = request.ValorProposta,
            EntradaProposta = request.EntradaProposta,
            QuantidadeParcela = request.QuantidadeParcela,
            ValorParcela = request.ValorParcela,
            SaldoRemanescente = request.ValorProposta - request.EntradaProposta - (request.QuantidadeParcela * request.ValorParcela ?? 0),
            ValorBens = request.ValorBens
        };

        _context.Propostas.Add(proposta);
        await _context.SaveChangesAsync();

        if (request.Baloes != null)
        {
            foreach (var b in request.Baloes)
            {
                var balao = new PropostaBalao
                {
                    PropostaId = proposta.Id,
                    Valor = b.Valor,
                    Data = b.Data
                };
                _context.PropostasBaloes.Add(balao);
            }
        }

        unidade.Situacao = "Reservada";
        _context.Unidades.Update(unidade);

        await _context.SaveChangesAsync();
        return proposta;
    }
}
