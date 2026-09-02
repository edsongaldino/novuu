using Microsoft.AspNetCore.Mvc;
using Novuu.Application.DTOs;
using Novuu.Application.Interfaces;
using System.Threading.Tasks;

namespace Novuu.WebApi.Controllers;

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
