using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using LancamentosOnline.Application.DTOs;
using LancamentosOnline.Application.Interfaces;
using LancamentosOnline.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace LancamentosOnline.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmpreendimentosController : ControllerBase
{
    private readonly IEmpreendimentoService _empreendimentoService;
    private readonly IApplicationDbContext _context;

    public EmpreendimentosController(IEmpreendimentoService empreendimentoService, IApplicationDbContext context)
    {
        _empreendimentoService = empreendimentoService;
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Search([FromQuery] SearchRequest request)
    {
        var result = await _empreendimentoService.SearchAsync(request);
        return Ok(result);
    }

    [HttpGet("autocomplete")]
    public async Task<IActionResult> Autocomplete([FromQuery] string query)
    {
        var result = await _empreendimentoService.GetAutocompleteAsync(query);
        return Ok(result);
    }

    [HttpGet("list")]
    public async Task<IActionResult> ListAll()
    {
        var list = await _context.Empreendimentos
            .Include(e => e.Construtora)
            .ToListAsync();
        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _context.Empreendimentos
            .Include(e => e.Construtora)
            .Include(e => e.Torres)
                .ThenInclude(t => t.Unidades)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (item == null) return NotFound();
        return Ok(item);
    }


    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Empreendimento data)
    {
        if (data.ConstrutoraId == 0)
        {
            var firstConstrutora = await _context.Construtoras.FirstOrDefaultAsync();
            if (firstConstrutora != null)
            {
                data.ConstrutoraId = firstConstrutora.Id;
            }
        }
        
        data.CreatedAt = DateTime.UtcNow;
        data.UpdatedAt = DateTime.UtcNow;
        
        _context.Empreendimentos.Add(data);
        await _context.SaveChangesAsync();
        
        var created = await _context.Empreendimentos
            .Include(e => e.Construtora)
            .FirstOrDefaultAsync(e => e.Id == data.Id);
            
        return CreatedAtAction(nameof(ListAll), new { id = data.Id }, created);
    }

    [HttpPost("import-xml")]
    public async Task<IActionResult> ImportXml(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("Nenhum arquivo enviado ou arquivo estÃ¡ vazio.");
        }

        try
        {
            using var stream = file.OpenReadStream();
            var doc = new System.Xml.XmlDocument();
            doc.Load(stream);

            var root = doc.DocumentElement;
            if (root == null)
            {
                return BadRequest("XML invÃ¡lido.");
            }

            var nome = root.SelectSingleNode("Nome")?.InnerText ?? "Novo Empreendimento XML";
            var descricao = root.SelectSingleNode("Descricao")?.InnerText;
            var tipo = root.SelectSingleNode("Tipo")?.InnerText ?? "Vertical";
            var status = root.SelectSingleNode("Status")?.InnerText ?? "Liberado";
            var previsao = root.SelectSingleNode("PrevisaoEntrega")?.InnerText;
            var logomarca = root.SelectSingleNode("Logomarca")?.InnerText;

            decimal? valorInicial = null;
            if (decimal.TryParse(root.SelectSingleNode("ValorInicial")?.InnerText, out var vIni))
            {
                valorInicial = vIni;
            }

            decimal? valorFinal = null;
            if (decimal.TryParse(root.SelectSingleNode("ValorFinal")?.InnerText, out var vFin))
            {
                valorFinal = vFin;
            }

            int qtdeTorre = 0;
            int.TryParse(root.SelectSingleNode("QtdeTorre")?.InnerText, out qtdeTorre);

            int qtdeQuadra = 0;
            int.TryParse(root.SelectSingleNode("QtdeQuadra")?.InnerText, out qtdeQuadra);

            decimal? latitude = null;
            if (decimal.TryParse(root.SelectSingleNode("Latitude")?.InnerText, out var latVal))
            {
                latitude = latVal;
            }

            decimal? longitude = null;
            if (decimal.TryParse(root.SelectSingleNode("Longitude")?.InnerText, out var lngVal))
            {
                longitude = lngVal;
            }

            var firstConstrutora = await _context.Construtoras.FirstOrDefaultAsync();
            if (firstConstrutora == null)
            {
                return BadRequest("NÃ£o existem construtoras cadastradas para vincular o empreendimento.");
            }

            var emp = new Empreendimento
            {
                ConstrutoraId = firstConstrutora.Id,
                Nome = nome,
                Descricao = descricao,
                Tipo = tipo,
                ValorInicial = valorInicial,
                ValorFinal = valorFinal,
                PrevisaoEntrega = previsao,
                QtdeTorre = qtdeTorre,
                QtdeQuadra = qtdeQuadra,
                Status = status,
                Logomarca = logomarca,
                Latitude = latitude,
                Longitude = longitude,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            _context.Empreendimentos.Add(emp);
            await _context.SaveChangesAsync();

            var created = await _context.Empreendimentos
                .Include(e => e.Construtora)
                .FirstOrDefaultAsync(e => e.Id == emp.Id);

            return Ok(created);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao processar o XML: {ex.Message}");
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Empreendimento updateData)
    {
        var item = await _context.Empreendimentos.FindAsync(id);
        if (item == null) return NotFound();

        item.Nome = updateData.Nome;
        item.Descricao = updateData.Descricao;
        item.Tipo = updateData.Tipo;
        item.ValorInicial = updateData.ValorInicial;
        item.ValorFinal = updateData.ValorFinal;
        item.PrevisaoEntrega = updateData.PrevisaoEntrega;
        item.QtdeTorre = updateData.QtdeTorre;
        item.QtdeQuadra = updateData.QtdeQuadra;
        item.Status = updateData.Status;
        item.Logomarca = updateData.Logomarca;
        item.Latitude = updateData.Latitude;
        item.Longitude = updateData.Longitude;
        item.UpdatedAt = DateTime.UtcNow;

        _context.Empreendimentos.Update(item);
        await _context.SaveChangesAsync();

        return Ok(item);
    }

    [HttpPost("{id}/upload-photo")]
    public async Task<IActionResult> UploadPhoto(int id, IFormFile file)
    {
        var item = await _context.Empreendimentos.FindAsync(id);
        if (item == null) return NotFound("Empreendimento não encontrado.");

        if (file == null || file.Length == 0) return BadRequest("Nenhum arquivo enviado.");

        try
        {
            using var ms = new System.IO.MemoryStream();
            await file.CopyToAsync(ms);
            var fileBytes = ms.ToArray();
            var base64String = $"data:{file.ContentType};base64,{Convert.ToBase64String(fileBytes)}";

            item.Logomarca = base64String;
            item.UpdatedAt = DateTime.UtcNow;

            _context.Empreendimentos.Update(item);
            await _context.SaveChangesAsync();

            return Ok(new { url = base64String });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao processar imagem: {ex.Message}");
        }
    }

    [HttpGet("{id}/photos")]
    public IActionResult GetPhotos(int id)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        var list = new System.Collections.Generic.List<string>();
        var legacyUploadsPat = @"C:\laragon\www\lancamentos\public\uploads";
        
        // 1. Scan original folder (primary source for gallery)
        var originalDir = System.IO.Path.Combine(legacyUploadsPat, "empreendimento", id.ToString(), "original");
        if (System.IO.Directory.Exists(originalDir))
        {
            try
            {
                var files = System.IO.Directory.GetFiles(originalDir);
                foreach (var f in files)
                {
                    var fileName = System.IO.Path.GetFileName(f);
                    var ext = System.IO.Path.GetExtension(f).ToLower();
                    if (ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".webp")
                    {
                        list.Add($"{baseUrl}/uploads/empreendimento/{id}/original/{fileName}");
                    }
                }
            }
            catch {}
        }
        
        // 2. Scan root folder of the development
        var rootDir = System.IO.Path.Combine(legacyUploadsPat, "empreendimento", id.ToString());
        if (System.IO.Directory.Exists(rootDir))
        {
            try
            {
                var files = System.IO.Directory.GetFiles(rootDir);
                foreach (var f in files)
                {
                    var fileName = System.IO.Path.GetFileName(f);
                    var ext = System.IO.Path.GetExtension(f).ToLower();
                    if (ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".webp")
                    {
                        list.Add($"{baseUrl}/uploads/empreendimento/{id}/{fileName}");
                    }
                }
            }
            catch {}
        }

        // 3. Scan arquivo folder (logomarcas)
        var arquivoDir = System.IO.Path.Combine(legacyUploadsPat, "empreendimento", id.ToString(), "arquivo");
        if (System.IO.Directory.Exists(arquivoDir))
        {
            try
            {
                var files = System.IO.Directory.GetFiles(arquivoDir);
                foreach (var f in files)
                {
                    var fileName = System.IO.Path.GetFileName(f);
                    var ext = System.IO.Path.GetExtension(f).ToLower();
                    if (ext == ".jpg" || ext == ".jpeg" || ext == ".png" || ext == ".webp")
                    {
                        list.Add($"{baseUrl}/uploads/empreendimento/{id}/arquivo/{fileName}");
                    }
                }
            }
            catch {}
        }
        
        // Deduplicate URLs
        var uniqueList = new System.Collections.Generic.List<string>();
        foreach (var url in list)
        {
            if (!uniqueList.Contains(url))
            {
                uniqueList.Add(url);
            }
        }
        
        if (uniqueList.Count == 0)
        {
            var emp = _context.Empreendimentos.Find(id);
            if (emp != null && !string.IsNullOrEmpty(emp.Logomarca))
            {
                if (emp.Logomarca.StartsWith("data:"))
                {
                    uniqueList.Add(emp.Logomarca);
                }
                else if (emp.Logomarca.Contains("/"))
                {
                    uniqueList.Add($"{baseUrl}/{emp.Logomarca}");
                }
                else
                {
                    uniqueList.Add($"{baseUrl}/uploads/empreendimento/{id}/arquivo/{emp.Logomarca}");
                }
            }
        }
        
        if (uniqueList.Count == 0)
        {
            uniqueList.Add("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80");
            uniqueList.Add("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80");
        }
        
        return Ok(uniqueList);
    }

    [HttpGet("{id}/photos-categorized")]
    public IActionResult GetPhotosCategorized(int id)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        var legacyUploadsPath = @"C:\laragon\www\lancamentos\public\uploads";
        
        // Query the fotos table from PostgreSQL for this development
        var fotosFromDb = _context.Fotos
            .Where(f => f.EmpreendimentoId == id && f.Status != "Excluído" && f.Arquivo != null)
            .OrderBy(f => f.Tipo)
            .ThenBy(f => f.Id)
            .ToList();

        // Build photo DTOs with resolved URLs
        var result = new System.Collections.Generic.List<object>();
        var seenUrls = new System.Collections.Generic.HashSet<string>();

        foreach (var foto in fotosFromDb)
        {
            var arquivo = foto.Arquivo?.Trim();
            if (string.IsNullOrEmpty(arquivo)) continue;

            // Try to resolve a file URL for this photo
            string? url = null;

            // Check original folder first
            var originalPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", id.ToString(), "original", arquivo);
            if (System.IO.File.Exists(originalPath))
            {
                url = $"{baseUrl}/uploads/empreendimento/{id}/original/{arquivo}";
            }
            else
            {
                // Try root folder
                var rootPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", id.ToString(), arquivo);
                if (System.IO.File.Exists(rootPath))
                {
                    url = $"{baseUrl}/uploads/empreendimento/{id}/{arquivo}";
                }
            }

            if (url != null && seenUrls.Add(url))
            {
                var tipo = string.IsNullOrWhiteSpace(foto.Tipo) ? "Geral" : foto.Tipo.Trim();
                // Normalize some type names for display
                tipo = tipo switch
                {
                    "Implantação" => "Implantação",
                    "Implantação Vertical - Frente" => "Implantação",
                    "Implantação Vertical - Fundo" => "Implantação",
                    "Implantação - Área de Lazer" => "Implantação",
                    "Estágio de Obra" => "Estágio de Obra",
                    "Mapa de Vagas" => "Implantação",
                    _ => tipo
                };

                result.Add(new {
                    url,
                    tipo,
                    destaquePrincipal = foto.DestaquePrincipal == "Sim",
                    arquivo,
                    nome = foto.Nome,
                    plantaId = foto.PlantaId,
                    destaquePlanta = foto.DestaquePlanta
                });
            }
        }

        return Ok(result);
    }
}
