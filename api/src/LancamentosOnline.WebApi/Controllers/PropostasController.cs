using Microsoft.AspNetCore.Mvc;
using LancamentosOnline.Application.DTOs;
using LancamentosOnline.Application.Interfaces;
using System;
using System.Threading.Tasks;

namespace LancamentosOnline.WebApi.Controllers;

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
