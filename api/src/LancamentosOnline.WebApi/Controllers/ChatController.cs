using Microsoft.AspNetCore.Mvc;
using LancamentosOnline.Application.DTOs;
using LancamentosOnline.Application.Interfaces;
using System.Threading.Tasks;

namespace LancamentosOnline.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    private readonly IChatService _chatService;

    public ChatController(IChatService chatService)
    {
        _chatService = chatService;
    }

    [HttpPost]
    public async Task<IActionResult> Post([FromBody] ChatRequest request)
    {
        var response = await _chatService.ProcessMessageAsync(request);
        return Ok(response);
    }
}
