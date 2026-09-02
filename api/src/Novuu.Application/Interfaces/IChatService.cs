using System.Threading.Tasks;
using Novuu.Application.DTOs;

namespace Novuu.Application.Interfaces;

public interface IChatService
{
    Task<ChatResponse> ProcessMessageAsync(ChatRequest request);
}
