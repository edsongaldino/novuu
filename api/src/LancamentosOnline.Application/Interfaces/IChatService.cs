using System.Threading.Tasks;
using LancamentosOnline.Application.DTOs;

namespace LancamentosOnline.Application.Interfaces;

public interface IChatService
{
    Task<ChatResponse> ProcessMessageAsync(ChatRequest request);
}
