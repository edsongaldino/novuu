using Microsoft.AspNetCore.Mvc;
using Novuu.Application.DTOs;
using Novuu.Application.Interfaces;
using System;
using System.Threading.Tasks;

namespace Novuu.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PropostasController : ControllerBase
{
    private readonly IPropostaService _propostaService;

    public PropostasController(IPropostaService propostaService)
    {
        _propostaService = propostaService;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePropostaRequest request)
    {
        try
        {
            var result = await _propostaService.CreatePropostaAsync(request);
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
