using System.Collections.Generic;
using System.Threading.Tasks;
using LancamentosOnline.Application.DTOs;

namespace LancamentosOnline.Application.Interfaces;

public interface IEmpreendimentoService
{
    Task<IEnumerable<EmpreendimentoListItemDto>> SearchAsync(SearchRequest request);
    Task<IEnumerable<AutocompleteDto>> GetAutocompleteAsync(string query);
}
