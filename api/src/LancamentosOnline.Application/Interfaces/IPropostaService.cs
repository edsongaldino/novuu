using System.Threading.Tasks;
using LancamentosOnline.Application.DTOs;
using LancamentosOnline.Domain.Entities;

namespace LancamentosOnline.Application.Interfaces;

public interface IPropostaService
{
    Task<Proposta> CreatePropostaAsync(CreatePropostaRequest request);
}
