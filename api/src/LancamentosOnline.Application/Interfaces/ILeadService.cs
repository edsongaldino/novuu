using System.Collections.Generic;
using System.Threading.Tasks;
using LancamentosOnline.Application.DTOs;

namespace LancamentosOnline.Application.Interfaces;

public interface ILeadService
{
    Task<IEnumerable<LeadDto>> GetLeadsByConstrutoraAsync(int construtoraId);
}
