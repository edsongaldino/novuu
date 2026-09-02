using System.Collections.Generic;
using System.Threading.Tasks;
using Novuu.Application.DTOs;

namespace Novuu.Application.Interfaces;

public interface ILeadService
{
    Task<IEnumerable<LeadDto>> GetLeadsByConstrutoraAsync(int construtoraId);
}
