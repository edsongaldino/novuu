using Microsoft.AspNetCore.Mvc;
using Novuu.Application.Interfaces;
using Novuu.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System;

namespace Novuu.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConstrutorasController : ControllerBase
{
    private readonly IApplicationDbContext _context;

    public ConstrutorasController(IApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var list = await _context.Construtoras.ToListAsync();
        var result = list.Select(c => new {
            c.Id,
            c.Nome,
            c.NomeAbreviado,
            c.RazaoSocial,
            c.Cnpj,
            Logo = c.Logo,
            LogoUrl = ResolveLogoUrl(c),
            c.Observacoes,
            c.TempoMercado,
            c.AnoFundacao,
            c.MesFundacao,
            c.Email,
            c.Telefone,
            c.CelularAtendimento,
            c.Whatsapp,
            c.UrlHotsite,
            c.Facebook,
            c.Instagram,
            c.Twitter,
            c.Youtube,
            c.Status,
            c.AcessoDomus
        });
        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _context.Construtoras.FindAsync(id);
        if (item == null) return NotFound();
        
        return Ok(new {
            item.Id,
            item.Nome,
            item.NomeAbreviado,
            item.RazaoSocial,
            item.Cnpj,
            item.Logo,
            LogoUrl = ResolveLogoUrl(item),
            item.Observacoes,
            item.TempoMercado,
            item.AnoFundacao,
            item.MesFundacao,
            item.Email,
            item.Telefone,
            item.CelularAtendimento,
            item.Whatsapp,
            item.UrlHotsite,
            item.Facebook,
            item.Instagram,
            item.Twitter,
            item.Youtube,
            item.Status,
            item.AcessoDomus
        });
    }

    private string? ResolveLogoUrl(Construtora item)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        var legacyUploadsPath = @"C:\laragon\www\lancamentos\public\uploads";
        var publicRootPath = @"C:\laragon\www\lancamentos\public";

        if (!string.IsNullOrWhiteSpace(item.Logo))
        {
            if (item.Logo.StartsWith("http", StringComparison.OrdinalIgnoreCase)) return item.Logo;

            var cleanLogo = item.Logo.TrimStart('/', '\\').Replace('/', System.IO.Path.DirectorySeparatorChar);
            var diskPath = System.IO.Path.Combine(publicRootPath, cleanLogo);
            if (System.IO.File.Exists(diskPath))
            {
                var webPath = item.Logo.TrimStart('/');
                return $"{baseUrl}/{webPath}";
            }
        }

        if (item.Id > 0)
        {
            var subDirs = new[] { "125x95", "original", "", "200x200", "260x260" };
            foreach (var dir in subDirs)
            {
                var folderPath = string.IsNullOrEmpty(dir)
                    ? System.IO.Path.Combine(legacyUploadsPath, "construtora", item.Id.ToString())
                    : System.IO.Path.Combine(legacyUploadsPath, "construtora", item.Id.ToString(), dir);

                if (System.IO.Directory.Exists(folderPath))
                {
                    try
                    {
                        var firstFile = System.IO.Directory.GetFiles(folderPath)
                            .FirstOrDefault(f => {
                                var ext = System.IO.Path.GetExtension(f).ToLower();
                                return ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".webp";
                            });

                        if (firstFile != null)
                        {
                            var fileName = System.IO.Path.GetFileName(firstFile);
                            return string.IsNullOrEmpty(dir)
                                ? $"{baseUrl}/uploads/construtora/{item.Id}/{fileName}"
                                : $"{baseUrl}/uploads/construtora/{item.Id}/{dir}/{fileName}";
                        }
                    }
                    catch { }
                }
            }
        }

        return null;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Construtora item)
    {
        item.CreatedAt = DateTime.UtcNow;
        item.UpdatedAt = DateTime.UtcNow;
        
        _context.Construtoras.Add(item);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
    }
}
