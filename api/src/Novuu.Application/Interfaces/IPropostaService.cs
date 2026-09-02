using System.Threading.Tasks;
using Novuu.Application.DTOs;
using Novuu.Domain.Entities;

namespace Novuu.Application.Interfaces;

public interface IPropostaService
{
    Task<Proposta> CreatePropostaAsync(CreatePropostaRequest request);
}
