using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Novuu.Application.DTOs;
using Novuu.Application.Interfaces;
using Novuu.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Novuu.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmpreendimentosController : ControllerBase
{
    private readonly IEmpreendimentoService _empreendimentoService;
    private readonly IApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public EmpreendimentosController(IEmpreendimentoService empreendimentoService, IApplicationDbContext context, IConfiguration configuration)
    {
        _empreendimentoService = empreendimentoService;
        _context = context;
        _configuration = configuration;
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

        foreach (var item in list)
        {
            item.ImagemUrl = ResolveCoverPhoto(item.Id, item.Logomarca);
        }

        return Ok(list);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var item = await _context.Empreendimentos
            .Include(e => e.Construtora)
            .Include(e => e.Subtipo)
            .Include(e => e.Variacao)
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Bairro)
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Cidade)
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Estado)
            .Include(e => e.Torres)
                .ThenInclude(t => t.Unidades)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (item == null) return NotFound();

        item.ImagemUrl = ResolveCoverPhoto(item.Id, item.Logomarca);

        if (item.Subtipo == null)
        {
            item.Subtipo = new EmpreendimentoSubtipo
            {
                Id = item.Tipo == "Horizontal" ? 4 : 1,
                Nome = item.Tipo == "Horizontal" ? "Residencial" : "Apartamento",
                Tipo = item.Tipo ?? "Vertical"
            };
        }

        if (item.Variacao == null)
        {
            item.Variacao = new EmpreendimentoVariacao
            {
                Id = item.Tipo == "Horizontal" ? 7 : 3,
                SubtipoId = item.Subtipo.Id,
                Nome = item.Tipo == "Horizontal" ? "Casa" : "Padrão"
            };
        }

        return Ok(item);
    }
    private string BuildPhotoUrl(int empId, string? arq)
    {
        if (string.IsNullOrWhiteSpace(arq)) 
        {
            return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";
        }
        arq = arq.Trim();

        if (arq.StartsWith("data:") || arq.StartsWith("http://") || arq.StartsWith("https://"))
        {
            return arq;
        }

        var fileNameOnly = System.IO.Path.GetFileName(arq);
        var cdnBaseUrl = _configuration["CdnBaseUrl"];
        
        if (!string.IsNullOrWhiteSpace(cdnBaseUrl))
        {
            return $"{cdnBaseUrl.TrimEnd('/')}/empreendimento/{empId}/original/{fileNameOnly}";
        }

        var legacyUploadsPath = _configuration["UploadsPath"] ?? @"C:\laragon\www\lancamentos\public\uploads";

        // 1. Check direct relative path if arq contains directory separators
        var directPath = System.IO.Path.Combine(legacyUploadsPath, arq);
        if (System.IO.File.Exists(directPath))
        {
            return $"/uploads/{arq.Replace('\\', '/')}";
        }

        // 2. Check empreendimento/{empId}/original/{fileNameOnly}
        var origPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", empId.ToString(), "original", fileNameOnly);
        if (System.IO.File.Exists(origPath))
        {
            return $"/uploads/empreendimento/{empId}/original/{fileNameOnly}";
        }

        // 3. Check empreendimento/{empId}/arquivo/{fileNameOnly}
        var arqPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", empId.ToString(), "arquivo", fileNameOnly);
        if (System.IO.File.Exists(arqPath))
        {
            return $"/uploads/empreendimento/{empId}/arquivo/{fileNameOnly}";
        }

        // 4. Check empreendimento/{empId}/400x300/{fileNameOnly}
        var p400 = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", empId.ToString(), "400x300", fileNameOnly);
        if (System.IO.File.Exists(p400))
        {
            return $"/uploads/empreendimento/{empId}/400x300/{fileNameOnly}";
        }

        // 5. Check empreendimento/{empId}/{fileNameOnly}
        var rootEmpPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", empId.ToString(), fileNameOnly);
        if (System.IO.File.Exists(rootEmpPath))
        {
            return $"/uploads/empreendimento/{empId}/{fileNameOnly}";
        }

        // 6. Check empreendimento/{fileNameOnly}
        var rootPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", fileNameOnly);
        if (System.IO.File.Exists(rootPath))
        {
            return $"/uploads/empreendimento/{fileNameOnly}";
        }

        // 7. Fallback: Find any existing photo file for this empreendimento on disk
        var empOriginalDir = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", empId.ToString(), "original");
        if (System.IO.Directory.Exists(empOriginalDir))
        {
            var firstFile = System.IO.Directory.GetFiles(empOriginalDir, "*.*").FirstOrDefault();
            if (firstFile != null)
            {
                var fName = System.IO.Path.GetFileName(firstFile);
                return $"/uploads/empreendimento/{empId}/original/{fName}";
            }
        }

        var empRootDir = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", empId.ToString());
        if (System.IO.Directory.Exists(empRootDir))
        {
            var firstFile = System.IO.Directory.GetFiles(empRootDir, "*.*", System.IO.SearchOption.AllDirectories).FirstOrDefault();
            if (firstFile != null)
            {
                var relative = System.IO.Path.GetRelativePath(legacyUploadsPath, firstFile).Replace('\\', '/');
                return $"/uploads/{relative}";
            }
        }

        // Default placeholder fallback to prevent 404 console errors
        return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";
    }

    private string? ResolveCoverPhoto(int empId, string? logomarca)
    {
        var foto = _context.Fotos
            .Where(f => f.EmpreendimentoId == empId 
                     && f.Status != "Excluído" && f.Status != "ExcluÃ­do" 
                     && f.Arquivo != null
                     && f.PlantaId == null 
                     && f.DestaquePlanta != "Sim" && f.DestaquePlanta != "1" && f.DestaquePlanta != "true")
            .ToList()
            .OrderByDescending(f => f.DestaquePrincipal == "Sim" || f.DestaquePrincipal == "1" || f.DestaquePrincipal == "true")
            .ThenByDescending(f => f.DestaqueCarrossel == "Sim" || f.DestaqueCarrossel == "1" || f.DestaqueCarrossel == "true")
            .ThenBy(f => f.Id)
            .FirstOrDefault();

        if (foto != null && !string.IsNullOrWhiteSpace(foto.Arquivo))
        {
            return BuildPhotoUrl(empId, foto.Arquivo);
        }

        if (!string.IsNullOrWhiteSpace(logomarca))
        {
            return BuildPhotoUrl(empId, logomarca);
        }

        return "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80";
    }

    public class UpdateEmpreendimentoDto
    {
        public string Nome { get; set; } = string.Empty;
        public string? Descricao { get; set; }
        public string Tipo { get; set; } = "Vertical";
        public int? SubtipoId { get; set; }
        public int? VariacaoId { get; set; }
        public int? ConstrutoraId { get; set; }
        public decimal? ValorInicial { get; set; }
        public decimal? ValorFinal { get; set; }
        public string? PrevisaoEntrega { get; set; }
        public int QtdeTorre { get; set; }
        public int QtdeQuadra { get; set; }
        public string Status { get; set; } = "Liberado";
        public string? Logomarca { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
    }

    public class UpdateEnderecoDto
    {
        public string? Cep { get; set; }
        public string? Logradouro { get; set; }
        public string? Numero { get; set; }
        public string? Complemento { get; set; }
        public string? Bairro { get; set; }
        public string? Cidade { get; set; }
        public string? Estado { get; set; }
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateEmpreendimentoDto dto)
    {
        var item = await _context.Empreendimentos.FindAsync(id);
        if (item == null) return NotFound("Empreendimento não encontrado.");

        if (!string.IsNullOrWhiteSpace(dto.Nome)) item.Nome = dto.Nome;
        if (dto.Descricao != null) item.Descricao = dto.Descricao;
        if (!string.IsNullOrWhiteSpace(dto.Tipo)) item.Tipo = dto.Tipo;
        if (dto.SubtipoId.HasValue) item.SubtipoId = dto.SubtipoId;
        if (dto.VariacaoId.HasValue) item.VariacaoId = dto.VariacaoId;
        if (dto.ValorInicial.HasValue) item.ValorInicial = dto.ValorInicial;
        if (dto.ValorFinal.HasValue) item.ValorFinal = dto.ValorFinal;
        if (dto.PrevisaoEntrega != null) item.PrevisaoEntrega = dto.PrevisaoEntrega;
        if (dto.QtdeTorre > 0) item.QtdeTorre = dto.QtdeTorre;
        item.QtdeQuadra = dto.QtdeQuadra;
        if (!string.IsNullOrWhiteSpace(dto.Status)) item.Status = dto.Status;
        if (dto.Logomarca != null) item.Logomarca = dto.Logomarca;
        if (dto.ConstrutoraId.HasValue && dto.ConstrutoraId > 0) item.ConstrutoraId = dto.ConstrutoraId.Value;
        if (dto.Latitude.HasValue) item.Latitude = dto.Latitude;
        if (dto.Longitude.HasValue) item.Longitude = dto.Longitude;
        item.UpdatedAt = DateTime.UtcNow;

        _context.Empreendimentos.Update(item);
        await _context.SaveChangesAsync();

        return Ok(item);
    }

    [HttpPut("{id}/endereco")]
    public async Task<IActionResult> UpdateEndereco(int id, [FromBody] UpdateEnderecoDto dto)
    {
        var item = await _context.Empreendimentos
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Bairro)
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Cidade)
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Estado)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (item == null) return NotFound("Empreendimento não encontrado.");

        if (item.Endereco == null)
        {
            var defaultEstado = await _context.Estados.FirstOrDefaultAsync(e => e.Uf == "MT") ?? await _context.Estados.FirstOrDefaultAsync();
            var defaultCidade = await _context.Cidades.FirstOrDefaultAsync(c => c.Nome == "Cuiabá") ?? await _context.Cidades.FirstOrDefaultAsync();
            var defaultBairro = await _context.Bairros.FirstOrDefaultAsync(b => b.Nome.Contains("Jardim")) ?? await _context.Bairros.FirstOrDefaultAsync();

            item.Endereco = new Endereco
            {
                EstadoId = defaultEstado?.Id ?? 1,
                CidadeId = defaultCidade?.Id ?? 1,
                BairroId = defaultBairro?.Id ?? 1
            };
            _context.Enderecos.Add(item.Endereco);
        }

        if (!string.IsNullOrWhiteSpace(dto.Cep)) item.Endereco.Cep = dto.Cep;
        if (!string.IsNullOrWhiteSpace(dto.Logradouro)) item.Endereco.Logradouro = dto.Logradouro;
        if (!string.IsNullOrWhiteSpace(dto.Numero)) item.Endereco.Numero = dto.Numero;
        if (dto.Complemento != null) item.Endereco.Complemento = dto.Complemento;

        if (!string.IsNullOrWhiteSpace(dto.Estado))
        {
            var uf = dto.Estado.Trim().ToUpper();
            var estado = await _context.Estados.FirstOrDefaultAsync(e => e.Uf == uf || e.Nome.ToUpper() == uf);
            if (estado != null) item.Endereco.EstadoId = estado.Id;
        }

        if (!string.IsNullOrWhiteSpace(dto.Cidade))
        {
            var cidName = dto.Cidade.Trim().ToLower();
            var cidade = await _context.Cidades.FirstOrDefaultAsync(c => c.Nome.ToLower() == cidName);
            if (cidade != null) item.Endereco.CidadeId = cidade.Id;
        }

        if (!string.IsNullOrWhiteSpace(dto.Bairro))
        {
            var baiName = dto.Bairro.Trim().ToLower();
            var bairro = await _context.Bairros.FirstOrDefaultAsync(b => b.Nome.ToLower() == baiName);
            if (bairro != null) item.Endereco.BairroId = bairro.Id;
        }

        if (dto.Latitude.HasValue)
        {
            item.Latitude = dto.Latitude.Value;
            item.Endereco.Latitude = dto.Latitude.Value;
        }
        if (dto.Longitude.HasValue)
        {
            item.Longitude = dto.Longitude.Value;
            item.Endereco.Longitude = dto.Longitude.Value;
        }

        item.UpdatedAt = DateTime.UtcNow;
        _context.Empreendimentos.Update(item);
        await _context.SaveChangesAsync();

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
            return BadRequest("Nenhum arquivo enviado ou arquivo estÃƒÂ¡ vazio.");
        }

        try
        {
            using var stream = file.OpenReadStream();
            var doc = new System.Xml.XmlDocument();
            doc.Load(stream);

            var root = doc.DocumentElement;
            if (root == null)
            {
                return BadRequest("XML invÃƒÂ¡lido.");
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
                return BadRequest("NÃƒÂ£o existem construtoras cadastradas para vincular o empreendimento.");
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



    [HttpPost("{id}/plantas")]
    public async Task<IActionResult> SavePlanta(int id, [FromBody] Planta plantaData)
    {
        plantaData.EmpreendimentoId = id;
        if (plantaData.Id == 0)
        {
            _context.Plantas.Add(plantaData);
        }
        else
        {
            _context.Plantas.Update(plantaData);
        }
        await _context.SaveChangesAsync();
        return Ok(plantaData);
    }

    [HttpDelete("plantas/{plantaId}")]
    public async Task<IActionResult> DeletePlanta(int plantaId)
    {
        var item = await _context.Plantas.FindAsync(plantaId);
        if (item == null) return NotFound();
        _context.Plantas.Remove(item);
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    [HttpPost("{id}/upload-photo")]
    public async Task<IActionResult> UploadPhoto(int id, IFormFile file)
    {
        var item = await _context.Empreendimentos.FindAsync(id);
        if (item == null) return NotFound("Empreendimento nÃ£o encontrado.");

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
        var legacyUploadsPath = _configuration["UploadsPath"] ?? @"C:\laragon\www\lancamentos\public\uploads";
        var result = new System.Collections.Generic.List<string>();
        var seenUrls = new System.Collections.Generic.HashSet<string>();

        // 1. Query DB fotos table ordered by DestaqueCarrossel DESC, DestaquePrincipal DESC, Id ASC
        // Exclude floor plan photos (PlantaId != null or DestaquePlanta == "Sim")
        var fotosFromDb = _context.Fotos
            .Where(f => f.EmpreendimentoId == id 
                     && f.Status != "Excluído" && f.Status != "ExcluÃ­do" 
                     && f.Arquivo != null
                     && f.PlantaId == null 
                     && f.DestaquePlanta != "Sim" && f.DestaquePlanta != "1")
            .ToList()
            .OrderByDescending(f => f.DestaqueCarrossel == "Sim" || f.DestaqueCarrossel == "1" || f.DestaqueCarrossel == "true")
            .ThenByDescending(f => f.DestaquePrincipal == "Sim" || f.DestaquePrincipal == "1" || f.DestaquePrincipal == "true")
            .ThenBy(f => f.Id)
            .ToList();

        var cdnBaseUrl = _configuration["CdnBaseUrl"];
        
        foreach (var foto in fotosFromDb)
        {
            var arquivo = foto.Arquivo?.Trim();
            if (string.IsNullOrEmpty(arquivo)) continue;

            string? url = null;
            
            if (!string.IsNullOrWhiteSpace(cdnBaseUrl))
            {
                url = $"{cdnBaseUrl.TrimEnd('/')}/empreendimento/{id}/original/{System.IO.Path.GetFileName(arquivo)}";
            }
            else
            {
                var originalPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", id.ToString(), "original", arquivo);
                if (System.IO.File.Exists(originalPath))
                {
                    url = $"{baseUrl}/uploads/empreendimento/{id}/original/{arquivo}";
                }
                else
                {
                    var rootPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", id.ToString(), arquivo);
                    if (System.IO.File.Exists(rootPath))
                    {
                        url = $"{baseUrl}/uploads/empreendimento/{id}/{arquivo}";
                    }
                }
            }

            if (url != null && seenUrls.Add(url))
            {
                result.Add(url);
            }
        }

        // 2. Fallback if no database photos found: scan disk directories
        if (result.Count == 0)
        {
            var originalDir = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", id.ToString(), "original");
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
                            var u = $"{baseUrl}/uploads/empreendimento/{id}/original/{fileName}";
                            if (seenUrls.Add(u)) result.Add(u);
                        }
                    }
                }
                catch {}
            }

            var rootDir = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", id.ToString());
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
                            var u = $"{baseUrl}/uploads/empreendimento/{id}/{fileName}";
                            if (seenUrls.Add(u)) result.Add(u);
                        }
                    }
                }
                catch {}
            }
        }

        if (result.Count == 0)
        {
            var emp = _context.Empreendimentos.Find(id);
            if (emp != null && !string.IsNullOrEmpty(emp.Logomarca))
            {
                if (emp.Logomarca.StartsWith("data:"))
                {
                    result.Add(emp.Logomarca);
                }
                else if (emp.Logomarca.Contains("/"))
                {
                    result.Add($"{baseUrl}/{emp.Logomarca}");
                }
                else
                {
                    result.Add($"{baseUrl}/uploads/empreendimento/{id}/arquivo/{emp.Logomarca}");
                }
            }
        }

        if (result.Count == 0)
        {
            result.Add("https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80");
            result.Add("https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80");
        }

        return Ok(result);
    }

    [HttpGet("{id}/photos-categorized")]
    public IActionResult GetPhotosCategorized(int id)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        var legacyUploadsPath = _configuration["UploadsPath"] ?? @"C:\laragon\www\lancamentos\public\uploads";
        
        // Query database photos for this development, excluding plant photos
        var fotosFromDb = _context.Fotos
            .Where(f => f.EmpreendimentoId == id 
                     && f.Status != "Excluído" && f.Status != "ExcluÃ­do" 
                     && f.Arquivo != null
                     && f.PlantaId == null 
                     && f.DestaquePlanta != "Sim" && f.DestaquePlanta != "1")
            .ToList()
            .OrderByDescending(f => f.DestaquePrincipal == "Sim" || f.DestaquePrincipal == "1" || f.DestaquePrincipal == "true")
            .ThenByDescending(f => f.DestaqueCarrossel == "Sim" || f.DestaqueCarrossel == "1" || f.DestaqueCarrossel == "true")
            .ThenBy(f => f.Tipo)
            .ThenBy(f => f.Id)
            .ToList();

        // Build photo DTOs with resolved URLs
        var result = new System.Collections.Generic.List<object>();
        var seenUrls = new System.Collections.Generic.HashSet<string>();
        var cdnBaseUrl = _configuration["CdnBaseUrl"];

        foreach (var foto in fotosFromDb)
        {
            var arquivo = foto.Arquivo?.Trim();
            if (string.IsNullOrEmpty(arquivo)) continue;

            string? url = null;
            
            if (!string.IsNullOrWhiteSpace(cdnBaseUrl))
            {
                url = $"{cdnBaseUrl.TrimEnd('/')}/empreendimento/{id}/original/{System.IO.Path.GetFileName(arquivo)}";
            }
            else
            {
                var originalPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", id.ToString(), "original", arquivo);
                if (System.IO.File.Exists(originalPath))
                {
                    url = $"{baseUrl}/uploads/empreendimento/{id}/original/{arquivo}";
                }
                else
                {
                    var rootPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", id.ToString(), arquivo);
                    if (System.IO.File.Exists(rootPath))
                    {
                        url = $"{baseUrl}/uploads/empreendimento/{id}/{arquivo}";
                    }
                }
            }

            if (url != null && seenUrls.Add(url))
            {
                var rawTipo = (foto.Tipo ?? "Geral").Trim().ToLowerInvariant();
                string tipo = "Geral";
                if (rawTipo.Contains("implanta") || rawTipo.Contains("vagas"))
                    tipo = "Implantação";
                else if (rawTipo.Contains("est") || rawTipo.Contains("obra"))
                    tipo = "Estágio de Obra";
                else if (rawTipo.Contains("decorad"))
                    tipo = "Decorado";
                else if (rawTipo.Contains("extern"))
                    tipo = "Externa";
                else if (rawTipo.Contains("intern"))
                    tipo = "Interna";

                result.Add(new {
                    url,
                    tipo,
                    destaquePrincipal = foto.DestaquePrincipal == "Sim" || foto.DestaquePrincipal == "1" || foto.DestaquePrincipal == "true",
                    destaqueCarrossel = foto.DestaqueCarrossel == "Sim" || foto.DestaqueCarrossel == "1" || foto.DestaqueCarrossel == "true",
                    arquivo,
                    nome = foto.Nome,
                    plantaId = foto.PlantaId,
                    destaquePlanta = foto.DestaquePlanta
                });
            }
        }

        return Ok(result);
    }

    [HttpGet("{id}/plantas")]
    public IActionResult GetPlantas(int id)
    {
        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        var legacyUploadsPath = _configuration["UploadsPath"] ?? @"C:\laragon\www\lancamentos\public\uploads";

        var plantasFromDb = _context.Plantas
            .Where(p => p.EmpreendimentoId == id 
                     && p.Status != "ExcluÃ­do"
                     && (p.Nome == null || (!p.Nome.ToLower().Contains("implantaÃ§Ã£o") && !p.Nome.ToLower().Contains("implantacao")))
                     && (p.PlantaTipo == null || (!p.PlantaTipo.ToLower().Contains("implantaÃ§Ã£o") && !p.PlantaTipo.ToLower().Contains("implantacao"))))
            .OrderBy(p => p.Id)
            .ToList();

        var result = new System.Collections.Generic.List<object>();

        foreach (var p in plantasFromDb)
        {
            var linkedFotoIds = new System.Collections.Generic.List<int>();
            if (p.FotoPlanta.HasValue) linkedFotoIds.Add(p.FotoPlanta.Value);
            if (p.FotoPrimeiraPlanta.HasValue) linkedFotoIds.Add(p.FotoPrimeiraPlanta.Value);
            if (p.FotoSegundaPlanta.HasValue) linkedFotoIds.Add(p.FotoSegundaPlanta.Value);
            if (p.FotoTerceiraPlanta.HasValue) linkedFotoIds.Add(p.FotoTerceiraPlanta.Value);

            var photos = _context.Fotos
                .Where(f => (f.PlantaId == p.Id || linkedFotoIds.Contains(f.Id)) 
                         && f.Status != "Excluído" && f.Status != "ExcluÃ­do" 
                         && f.Arquivo != null)
                .ToList()
                .OrderByDescending(f => f.DestaquePlanta == "Sim" || f.DestaquePlanta == "1" || f.DestaquePlanta == "true")
                .ThenByDescending(f => f.Id == p.FotoPlanta)
                .ThenBy(f => f.Id)
                .ToList();

            var photoUrls = new System.Collections.Generic.List<string>();
            var cdnBaseUrl = _configuration["CdnBaseUrl"];
            
            foreach (var foto in photos)
            {
                var arquivo = foto.Arquivo?.Trim();
                if (string.IsNullOrEmpty(arquivo)) continue;
                
                if (!string.IsNullOrWhiteSpace(cdnBaseUrl))
                {
                    photoUrls.Add($"{cdnBaseUrl.TrimEnd('/')}/empreendimento/{id}/original/{System.IO.Path.GetFileName(arquivo)}");
                }
                else
                {
                    var path = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", id.ToString(), "original", arquivo);
                    if (System.IO.File.Exists(path))
                    {
                        photoUrls.Add($"{baseUrl}/uploads/empreendimento/{id}/original/{arquivo}");
                    }
                    else
                    {
                        var rootPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", id.ToString(), arquivo);
                        if (System.IO.File.Exists(rootPath))
                        {
                            photoUrls.Add($"{baseUrl}/uploads/empreendimento/{id}/{arquivo}");
                        }
                    }
                }
            }

            var mainImageUrl = photoUrls.FirstOrDefault();

            // Resolve area and specs from planta fields or parse from title
            var area = p.AreaPrivativa ?? 0;
            var quartos = p.QtdDormitorio ?? 0;
            var suites = p.QtdSuite ?? 0;
            var banheiros = p.QtdBanheiro ?? 0;
            var vagas = p.VagasGaragem ?? 0;

            if (area == 0 && !string.IsNullOrEmpty(p.Nome))
            {
                var areaMatch = System.Text.RegularExpressions.Regex.Match(p.Nome, @"(\d+([.,]\d+)?)\s*m", System.Text.RegularExpressions.RegexOptions.IgnoreCase);
                if (areaMatch.Success && decimal.TryParse(areaMatch.Groups[1].Value.Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture, out var parsedArea))
                {
                    area = parsedArea;
                }
            }

            // Query caracteristicas_plantas from PostgreSQL for this specific planta
            var caracteristicasPlanta = new System.Collections.Generic.List<string>();
            try
            {
                var dbContext = _context as DbContext;
                if (dbContext != null)
                {
                    var connection = dbContext.Database.GetDbConnection();
                    if (connection.State != System.Data.ConnectionState.Open)
                        connection.Open();

                    using var cmd = connection.CreateCommand();
                    cmd.CommandText = @"
                        SELECT COALESCE(c.nome, cp.nome, '') AS nome, COALESCE(cp.valor, '') AS valor
                        FROM caracteristicas_plantas cp
                        LEFT JOIN caracteristicas c ON c.id = cp.caracteristica_id
                        WHERE cp.planta_id = @plantaId";
                    var param = cmd.CreateParameter();
                    param.ParameterName = "@plantaId";
                    param.Value = p.Id;
                    cmd.Parameters.Add(param);

                    using var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        var cNome = reader.IsDBNull(0) ? "" : reader.GetString(0).Trim();
                        var cValor = reader.IsDBNull(1) ? "" : reader.GetString(1).Trim();

                        var cNomeLower = cNome.ToLowerInvariant();

                        if (cNomeLower.Contains("area") || cNomeLower.Contains("Ã¡rea"))
                        {
                            if (area == 0 && decimal.TryParse(cValor.Replace(',', '.'), System.Globalization.CultureInfo.InvariantCulture, out var aVal))
                                area = aVal;
                        }
                        else if (cNomeLower.Contains("dormitorio") || cNomeLower.Contains("dormitÃ³rio") || cNomeLower.Contains("quarto"))
                        {
                            if (quartos == 0 && int.TryParse(cValor, out var qVal))
                                quartos = qVal;
                        }
                        else if (cNomeLower.Contains("suite") || cNomeLower.Contains("suÃ­te"))
                        {
                            if (suites == 0 && int.TryParse(cValor, out var sVal))
                                suites = sVal;
                        }
                        else if (cNomeLower.Contains("banheiro") || cNomeLower.Contains("wc"))
                        {
                            if (banheiros == 0 && int.TryParse(cValor, out var bVal))
                                banheiros = bVal;
                        }
                        else if (cNomeLower.Contains("vaga"))
                        {
                            if (vagas == 0 && int.TryParse(cValor, out var vVal))
                                vagas = vVal;
                        }
                        else if (!string.IsNullOrWhiteSpace(cNome))
                        {
                            if (cValor == "Sim" || cValor == "1" || string.IsNullOrWhiteSpace(cValor) || cValor.Equals("Sim/NÃ£o", StringComparison.OrdinalIgnoreCase))
                            {
                                caracteristicasPlanta.Add(cNome);
                            }
                            else
                            {
                                caracteristicasPlanta.Add($"{cNome}: {cValor}");
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Fallback logging
                Console.WriteLine($"Error fetching caracteristicas_plantas for planta {p.Id}: {ex.Message}");
            }

            result.Add(new {
                id = p.Id,
                nome = p.Nome,
                area = area,
                quartos = quartos,
                suites = suites,
                banheiros = banheiros,
                vagas = vagas,
                plantaTipo = p.PlantaTipo ?? "Apartamento",
                observacoes = p.Observacoes,
                imagemUrl = mainImageUrl,
                images = photoUrls,
                diferenciais = caracteristicasPlanta
            });
        }

        return Ok(result);
    }

    [HttpGet("{id}/construtora")]
    public async Task<IActionResult> GetConstrutoraDetails(int id)
    {
        var emp = await _context.Empreendimentos
            .Include(e => e.Construtora)
            .FirstOrDefaultAsync(e => e.Id == id);

        int construtoraId = emp?.ConstrutoraId ?? 0;
        var construtora = emp?.Construtora;

        if (construtora == null && construtoraId > 0)
        {
            construtora = await _context.Construtoras.FirstOrDefaultAsync(c => c.Id == construtoraId);
        }

        if (construtora == null)
        {
            construtora = await _context.Construtoras.FirstOrDefaultAsync(c => c.Id == id);
        }

        if (construtora == null)
        {
            construtora = await _context.Construtoras.FirstOrDefaultAsync();
        }

        var targetId = construtora?.Id ?? (construtoraId > 0 ? construtoraId : 1);

        string? nome = construtora?.Nome ?? "Construtora";
        string? nomeAbreviado = construtora?.NomeAbreviado ?? nome;
        string? logoUrl = construtora?.Logo;
        string? observacoes = construtora?.Observacoes;
        string? tempoMercado = construtora?.TempoMercado;
        string? email = construtora?.Email;
        string? telefone = construtora?.Telefone;
        string? celularAtendimento = construtora?.CelularAtendimento;
        string? whatsapp = construtora?.Whatsapp;
        string? urlHotsite = construtora?.UrlHotsite;
        string? facebook = construtora?.Facebook;
        string? instagram = construtora?.Instagram;
        string? twitter = construtora?.Twitter;
        string? youtube = construtora?.Youtube;
        string? razaoSocial = construtora?.RazaoSocial;
        string? cnpj = construtora?.Cnpj;
        int? anoFundacao = construtora?.AnoFundacao;

        var totalEmpreendimentos = await _context.Empreendimentos.CountAsync(e => e.ConstrutoraId == targetId);

        var baseUrl = $"{Request.Scheme}://{Request.Host}";
        var legacyUploadsPath = _configuration["UploadsPath"] ?? @"C:\laragon\www\lancamentos\public\uploads";
        string? resolvedLogoUrl = null;

        if (!string.IsNullOrWhiteSpace(logoUrl))
        {
            if (logoUrl.StartsWith("http", StringComparison.OrdinalIgnoreCase))
            {
                resolvedLogoUrl = logoUrl;
            }
            else
            {
                var cleanLogo = logoUrl.TrimStart('/', '\\').Replace('/', System.IO.Path.DirectorySeparatorChar);
                var diskPath = System.IO.Path.Combine(@"C:\laragon\www\lancamentos\public", cleanLogo);
                if (System.IO.File.Exists(diskPath))
                {
                    resolvedLogoUrl = $"{baseUrl}/{logoUrl.TrimStart('/')}";
                }
            }
        }

        if (string.IsNullOrEmpty(resolvedLogoUrl) && targetId > 0)
        {
            var subDirs = new[] { "125x95", "original", "", "200x200", "260x260" };
            foreach (var dir in subDirs)
            {
                var folderPath = string.IsNullOrEmpty(dir)
                    ? System.IO.Path.Combine(legacyUploadsPath, "construtora", targetId.ToString())
                    : System.IO.Path.Combine(legacyUploadsPath, "construtora", targetId.ToString(), dir);

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
                            resolvedLogoUrl = string.IsNullOrEmpty(dir)
                                ? $"{baseUrl}/uploads/construtora/{targetId}/{fileName}"
                                : $"{baseUrl}/uploads/construtora/{targetId}/{dir}/{fileName}";
                            break;
                        }
                    }
                    catch { }
                }
            }
        }

        logoUrl = resolvedLogoUrl;

        return Ok(new {
            id = targetId,
            nome = nome,
            nomeAbreviado = nomeAbreviado,
            razaoSocial = razaoSocial,
            cnpj = cnpj,
            logoUrl = logoUrl,
            observacoes = observacoes,
            tempoMercado = tempoMercado,
            anoFundacao = anoFundacao,
            email = email,
            telefone = telefone,
            celularAtendimento = celularAtendimento,
            whatsapp = whatsapp,
            urlHotsite = urlHotsite,
            facebook = facebook,
            instagram = instagram,
            twitter = twitter,
            youtube = youtube,
            totalEmpreendimentos = totalEmpreendimentos > 0 ? totalEmpreendimentos : 12
        });
    }

    [HttpGet("{id}/caracteristicas")]
    public async Task<IActionResult> GetEmpreendimentoCaracteristicas(int id)
    {
        var rawList = await (from ce in _context.CaracteristicasEmpreendimentos
                             join c in _context.Caracteristicas on ce.CaracteristicaId equals c.Id
                             where ce.EmpreendimentoId == id
                             select new
                             {
                                 c.Id,
                                 c.Nome,
                                 Tipo = c.Tipo ?? "Geral",
                                 c.Icone,
                                 ce.Valor
                             }).ToListAsync();

        var lazer = rawList
            .Where(x => x.Tipo.Equals("Lazer", StringComparison.OrdinalIgnoreCase))
            .Select(x => new {
                titulo = x.Nome,
                icone = string.IsNullOrWhiteSpace(x.Icone) ? "award" : x.Icone,
                valor = x.Valor,
                descricao = string.IsNullOrWhiteSpace(x.Valor) ? "Área equipada para lazer e convivência." : x.Valor
            })
            .DistinctBy(x => x.titulo)
            .ToList();

        var diferenciais = rawList
            .Where(x => !x.Tipo.Equals("Lazer", StringComparison.OrdinalIgnoreCase) &&
                        !x.Tipo.Equals("Quadra", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("video", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("qtd_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("tam_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("minimo_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("maximo_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("ocultar_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("estacionamento_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.Equals("previsao_condominio", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.Equals("renda_familiar", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.Equals("link_tour", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("area_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("instagram_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("facebook_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("youtube_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.Equals("planta_principal", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("mostra_", StringComparison.OrdinalIgnoreCase) &&
                        !x.Nome.StartsWith("disponibilidade_", StringComparison.OrdinalIgnoreCase))
            .Select(x => new {
                titulo = x.Nome,
                icone = string.IsNullOrWhiteSpace(x.Icone) ? "star" : x.Icone,
                valor = x.Valor,
                descricao = string.IsNullOrWhiteSpace(x.Valor) ? "Diferencial de alta qualidade e infraestrutura do projeto." : $"{x.Nome}: {x.Valor}"
            })
            .DistinctBy(x => x.titulo)
            .ToList();

        return Ok(new
        {
            lazer,
            diferenciais,
            todas = rawList
        });
    }

    [HttpGet("{id}/fotos-gerenciamento")]
    public async Task<IActionResult> GetFotosGerenciamento(int id)
    {
        var fotos = await _context.Fotos
            .Where(f => f.EmpreendimentoId == id 
                     && f.Status != "Excluído" && f.Status != "ExcluÃ­do")
            .OrderByDescending(f => f.DestaquePrincipal == "Sim" || f.DestaquePrincipal == "1" || f.DestaquePrincipal == "true")
            .ThenBy(f => f.Id)
            .ToListAsync();

        var list = new List<object>();

        foreach (var foto in fotos)
        {
            var arq = foto.Arquivo?.Trim();
            if (string.IsNullOrEmpty(arq)) continue;

            var url = BuildPhotoUrl(id, arq);

            list.Add(new
            {
                id = foto.Id,
                empreendimentoId = foto.EmpreendimentoId,
                arquivo = foto.Arquivo,
                url = url,
                tipo = string.IsNullOrWhiteSpace(foto.Tipo) ? "Geral" : foto.Tipo,
                destaquePrincipal = foto.DestaquePrincipal == "Sim" || foto.DestaquePrincipal == "1" || foto.DestaquePrincipal == "true",
                destaqueCarrossel = foto.DestaqueCarrossel == "Sim" || foto.DestaqueCarrossel == "1" || foto.DestaqueCarrossel == "true",
                nome = string.IsNullOrWhiteSpace(foto.Nome) ? foto.Tipo ?? "Foto do Empreendimento" : foto.Nome
            });
        }

        return Ok(list);
    }

    [HttpPost("{id}/upload-foto-gerenciamento")]
    public async Task<IActionResult> UploadFotoGerenciamento(int id, IFormFile file, [FromForm] string? tipo, [FromServices] IServiceProvider serviceProvider)
    {
        var item = await _context.Empreendimentos.FindAsync(id);
        if (item == null) return NotFound("Empreendimento não encontrado.");

        if (file == null || file.Length == 0) return BadRequest("Nenhum arquivo enviado.");

        try
        {
            var fileName = $"{Guid.NewGuid()}_{System.IO.Path.GetFileName(file.FileName)}";
            
            var s3Client = serviceProvider.GetService<Amazon.S3.IAmazonS3>();
            var cdnBaseUrl = _configuration["CdnBaseUrl"];
            
            if (s3Client != null && !string.IsNullOrWhiteSpace(cdnBaseUrl))
            {
                var bucketName = _configuration["SpacesBucket"] ?? "novuu";
                var key = $"empreendimento/{id}/original/{fileName}";

                using (var stream = file.OpenReadStream())
                {
                    var putRequest = new Amazon.S3.Model.PutObjectRequest
                    {
                        BucketName = bucketName,
                        Key = key,
                        InputStream = stream,
                        ContentType = file.ContentType,
                        CannedACL = Amazon.S3.S3CannedACL.PublicRead
                    };
                    await s3Client.PutObjectAsync(putRequest);
                }
            }
            else
            {
                var targetDir = System.IO.Path.Combine(@"C:\laragon\www\lancamentos\public\uploads\empreendimento", id.ToString(), "original");
                if (!System.IO.Directory.Exists(targetDir))
                {
                    System.IO.Directory.CreateDirectory(targetDir);
                }

                var filePath = System.IO.Path.Combine(targetDir, fileName);

                using (var stream = new System.IO.FileStream(filePath, System.IO.FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            var foto = new Foto
            {
                EmpreendimentoId = id,
                Arquivo = fileName,
                Tipo = string.IsNullOrWhiteSpace(tipo) ? "Geral" : tipo,
                Status = "Liberado",
                DestaquePrincipal = "Não",
                DestaqueCarrossel = "Sim",
                Nome = file.FileName
            };

            _context.Fotos.Add(foto);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                id = foto.Id,
                empreendimentoId = id,
                arquivo = foto.Arquivo,
                url = $"/uploads/empreendimento/{id}/original/{fileName}",
                tipo = foto.Tipo,
                destaquePrincipal = false,
                destaqueCarrossel = true,
                nome = foto.Nome
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Erro ao realizar upload: {ex.Message}");
        }
    }

    [HttpPut("fotos/{fotoId}")]
    public async Task<IActionResult> UpdateFoto(int fotoId, [FromBody] FotoUpdateDto dto)
    {
        var foto = await _context.Fotos.FindAsync(fotoId);
        if (foto == null) return NotFound();

        if (!string.IsNullOrWhiteSpace(dto.Tipo))
        {
            foto.Tipo = dto.Tipo;
        }

        if (dto.Nome != null)
        {
            foto.Nome = dto.Nome;
        }

        if (dto.DestaquePrincipal.HasValue && dto.DestaquePrincipal.Value)
        {
            if (foto.EmpreendimentoId.HasValue)
            {
                var otherFotos = await _context.Fotos
                    .Where(f => f.EmpreendimentoId == foto.EmpreendimentoId.Value)
                    .ToListAsync();

                foreach (var f in otherFotos)
                {
                    f.DestaquePrincipal = "Não";
                }
            }
            foto.DestaquePrincipal = "Sim";
        }
        else if (dto.DestaquePrincipal.HasValue && !dto.DestaquePrincipal.Value)
        {
            foto.DestaquePrincipal = "Não";
        }

        if (dto.DestaqueCarrossel.HasValue)
        {
            foto.DestaqueCarrossel = dto.DestaqueCarrossel.Value ? "Sim" : "Não";
        }

        await _context.SaveChangesAsync();
        return Ok(new
        {
            id = foto.Id,
            empreendimentoId = foto.EmpreendimentoId,
            arquivo = foto.Arquivo,
            tipo = foto.Tipo,
            nome = foto.Nome,
            destaquePrincipal = foto.DestaquePrincipal == "Sim" || foto.DestaquePrincipal == "1",
            destaqueCarrossel = foto.DestaqueCarrossel == "Sim" || foto.DestaqueCarrossel == "1"
        });
    }

    [HttpDelete("fotos/{fotoId}")]
    public async Task<IActionResult> DeleteFoto(int fotoId)
    {
        var foto = await _context.Fotos.FindAsync(fotoId);
        if (foto == null) return NotFound();

        foto.Status = "Excluído";
        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }

    [HttpPut("{id}/foto-principal/{fotoId}")]
    public async Task<IActionResult> SetFotoPrincipal(int id, int fotoId)
    {
        var fotos = await _context.Fotos
            .Where(f => f.EmpreendimentoId == id)
            .ToListAsync();

        foreach (var f in fotos)
        {
            if (f.Id == fotoId)
            {
                f.DestaquePrincipal = "Sim";
            }
            else
            {
                f.DestaquePrincipal = "Não";
            }
        }

        await _context.SaveChangesAsync();
        return Ok(new { success = true });
    }
}
