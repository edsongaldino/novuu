using System.Collections.Generic;
using System.Threading.Tasks;
using Novuu.Application.DTOs;

namespace Novuu.Application.Interfaces;

public interface IEmpreendimentoService
{
    Task<IEnumerable<EmpreendimentoListItemDto>> SearchAsync(SearchRequest request);
    Task<IEnumerable<AutocompleteDto>> GetAutocompleteAsync(string query);
}
