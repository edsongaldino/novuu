using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Novuu.Application.DTOs;
using Novuu.Application.Interfaces;
namespace Novuu.Application.Services;

public class EmpreendimentoService : IEmpreendimentoService
{
    private readonly IApplicationDbContext _context;
    private readonly Microsoft.Extensions.Configuration.IConfiguration _configuration;

    public EmpreendimentoService(IApplicationDbContext context, Microsoft.Extensions.Configuration.IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    public async Task<IEnumerable<EmpreendimentoListItemDto>> SearchAsync(SearchRequest request)
    {
        var query = _context.Empreendimentos
            .Include(e => e.Construtora)
            .Include(e => e.Subtipo)
            .Include(e => e.Variacao)
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Bairro)
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Cidade)
            .Include(e => e.Endereco).ThenInclude(ed => ed!.Estado)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(request.Query))
        {
            var queryLower = request.Query.ToLower();
            query = query.Where(e => e.Nome.ToLower().Contains(queryLower) ||
                                     (e.Descricao != null && e.Descricao.ToLower().Contains(queryLower)));
        }

        if (!string.IsNullOrWhiteSpace(request.Tipo))
        {
            query = query.Where(e => e.Tipo == request.Tipo);
        }

        if (request.PrecoMinimo.HasValue)
        {
            query = query.Where(e => e.ValorInicial >= request.PrecoMinimo.Value);
        }

        if (request.PrecoMaximo.HasValue)
        {
            query = query.Where(e => e.ValorInicial <= request.PrecoMaximo.Value);
        }

        var list = await query
            .Select(e => new EmpreendimentoListItemDto
            {
                Id = e.Id,
                Nome = e.Nome,
                ConstrutoraNome = e.Construtora.NomeAbreviado ?? e.Construtora.Nome,
                ConstrutoraId = e.ConstrutoraId,
                ConstrutoraLogo = e.Construtora.Logo,
                Tipo = e.Tipo,
                SubtipoId = e.SubtipoId,
                SubtipoNome = e.Subtipo != null ? e.Subtipo.Nome : (e.Tipo == "Horizontal" ? "Residencial" : "Apartamento"),
                VariacaoId = e.VariacaoId,
                VariacaoNome = e.Variacao != null ? e.Variacao.Nome : (e.Tipo == "Horizontal" ? "Casa" : "Padrão"),
                ValorInicial = e.ValorInicial,
                ValorFinal = e.ValorFinal,
                PrevisaoEntrega = e.PrevisaoEntrega,
                Logomarca = e.Logomarca,
                Descricao = e.Descricao,
                EnderecoId = e.EnderecoId,
                Logradouro = e.Endereco != null ? e.Endereco.Logradouro : null,
                Numero = e.Endereco != null ? e.Endereco.Numero : null,
                Complemento = e.Endereco != null ? e.Endereco.Complemento : null,
                BairroNome = e.Endereco != null && e.Endereco.Bairro != null ? e.Endereco.Bairro.Nome : null,
                CidadeNome = e.Endereco != null && e.Endereco.Cidade != null ? e.Endereco.Cidade.Nome : null,
                EstadoUf = e.Endereco != null && e.Endereco.Estado != null ? e.Endereco.Estado.Uf : null,
                Latitude = e.Endereco != null && e.Endereco.Latitude.HasValue ? e.Endereco.Latitude : e.Latitude,
                Longitude = e.Endereco != null && e.Endereco.Longitude.HasValue ? e.Endereco.Longitude : e.Longitude,
                EnderecoFormatado = e.Endereco != null 
                    ? ((e.Endereco.Logradouro ?? "") + (string.IsNullOrEmpty(e.Endereco.Numero) || e.Endereco.Numero == "0" ? ", S/N" : ", " + e.Endereco.Numero) + (e.Endereco.Bairro != null ? " - " + e.Endereco.Bairro.Nome : "") + (e.Endereco.Cidade != null ? ", " + e.Endereco.Cidade.Nome : "") + (e.Endereco.Estado != null ? " - " + e.Endereco.Estado.Uf : ""))
                    : null
            })
            .ToListAsync();

        var empIds = list.Select(l => l.Id).ToList();
        var cdnBaseUrl = _configuration["CdnBaseUrl"];
        var legacyUploadsPath = _configuration["UploadsPath"] ?? @"C:\laragon\www\lancamentos\public\uploads";

        // Query photos for all items in list, excluding plant photos
        var allFotos = await _context.Fotos
            .Where(f => f.EmpreendimentoId.HasValue 
                     && empIds.Contains(f.EmpreendimentoId.Value)
                     && f.Status != "Excluído" && f.Status != "ExcluÃ­do"
                     && f.Arquivo != null
                     && f.PlantaId == null
                     && f.DestaquePlanta != "Sim" && f.DestaquePlanta != "1" && f.DestaquePlanta != "true")
            .ToListAsync();

        foreach (var item in list)
        {
            var empFotos = allFotos
                .Where(f => f.EmpreendimentoId == item.Id)
                .Where(f => {
                    var arq = f.Arquivo ?? string.Empty;
                    var nm = f.Nome ?? string.Empty;
                    return !arq.Contains("planta", StringComparison.OrdinalIgnoreCase) 
                        && !nm.Contains("planta", StringComparison.OrdinalIgnoreCase);
                })
                .OrderByDescending(f => f.DestaquePrincipal == "Sim" || f.DestaquePrincipal == "1" || f.DestaquePrincipal == "true")
                .ThenByDescending(f => f.DestaqueCarrossel == "Sim" || f.DestaqueCarrossel == "1" || f.DestaqueCarrossel == "true")
                .ThenBy(f => f.Id)
                .ToList();

            foreach (var foto in empFotos)
            {
                var arquivo = foto.Arquivo?.Trim();
                if (string.IsNullOrEmpty(arquivo)) continue;

                if (!string.IsNullOrWhiteSpace(cdnBaseUrl))
                {
                    item.ImagemUrl = $"{cdnBaseUrl.TrimEnd('/')}/empreendimento/{item.Id}/original/{System.IO.Path.GetFileName(arquivo)}";
                    break;
                }
                else
                {
                    var p400 = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", item.Id.ToString(), "400x300", arquivo);
                    if (System.IO.File.Exists(p400))
                    {
                        item.ImagemUrl = $"/uploads/empreendimento/{item.Id}/400x300/{arquivo}";
                        break;
                    }

                    var origPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", item.Id.ToString(), "original", arquivo);
                    if (System.IO.File.Exists(origPath))
                    {
                        item.ImagemUrl = $"/uploads/empreendimento/{item.Id}/original/{arquivo}";
                        break;
                    }

                    var rootPath = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", item.Id.ToString(), arquivo);
                    if (System.IO.File.Exists(rootPath))
                    {
                        item.ImagemUrl = $"/uploads/empreendimento/{item.Id}/{arquivo}";
                        break;
                    }

                    var p262 = System.IO.Path.Combine(legacyUploadsPath, "empreendimento", item.Id.ToString(), "262x221", arquivo);
                    if (System.IO.File.Exists(p262))
                    {
                        item.ImagemUrl = $"/uploads/empreendimento/{item.Id}/262x221/{arquivo}";
                        break;
                    }
                }
            }

            if (string.IsNullOrEmpty(item.ImagemUrl))
            {
                var subDirs = new[] { "400x300", "original", "", "262x221" };
                foreach (var dir in subDirs)
                {
                    var folderPath = string.IsNullOrEmpty(dir) 
                        ? System.IO.Path.Combine(legacyUploadsPath, "empreendimento", item.Id.ToString())
                        : System.IO.Path.Combine(legacyUploadsPath, "empreendimento", item.Id.ToString(), dir);

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
                                item.ImagemUrl = string.IsNullOrEmpty(dir)
                                    ? $"/uploads/empreendimento/{item.Id}/{fileName}"
                                    : $"/uploads/empreendimento/{item.Id}/{dir}/{fileName}";
                                break;
                            }
                        }
                        catch { }
                    }
                }
            }

            if (string.IsNullOrEmpty(item.ImagemUrl) && !string.IsNullOrEmpty(item.Logomarca))
            {
                if (item.Logomarca.StartsWith("data:") || item.Logomarca.StartsWith("http"))
                {
                    item.ImagemUrl = item.Logomarca;
                }
                else if (item.Logomarca.Contains("/"))
                {
                    item.ImagemUrl = $"/{item.Logomarca.TrimStart('/')}";
                }
                else
                {
                    item.ImagemUrl = $"/uploads/empreendimento/{item.Id}/arquivo/{item.Logomarca}";
                }
            }

            // Resolve Construtora Logo URL
            var cLogo = item.ConstrutoraLogo;
            if (!string.IsNullOrEmpty(cLogo))
            {
                if (cLogo.StartsWith("http", StringComparison.OrdinalIgnoreCase) || cLogo.StartsWith("data:", StringComparison.OrdinalIgnoreCase))
                {
                    item.ConstrutoraLogoUrl = cLogo;
                }
                else
                {
                    var cleanLogoUrl = cLogo.TrimStart('/', '\\').Replace('\\', '/');
                    
                    if (!string.IsNullOrWhiteSpace(cdnBaseUrl))
                    {
                        item.ConstrutoraLogoUrl = $"{cdnBaseUrl.TrimEnd('/')}/{cleanLogoUrl}";
                    }
                    else
                    {
                        var cleanLogoDisk = cLogo.TrimStart('/', '\\').Replace('/', System.IO.Path.DirectorySeparatorChar);
                        var diskPath = System.IO.Path.Combine(legacyUploadsPath, cleanLogoDisk);
                        if (System.IO.File.Exists(diskPath))
                        {
                            item.ConstrutoraLogoUrl = $"/{cLogo.TrimStart('/')}";
                        }
                    }
                }
            }

            if (string.IsNullOrEmpty(item.ConstrutoraLogoUrl) && item.ConstrutoraId > 0 && string.IsNullOrWhiteSpace(cdnBaseUrl))
            {
                var subDirsLogo = new[] { "125x95", "original", "", "200x200" };
                foreach (var dir in subDirsLogo)
                {
                    var folderPath = string.IsNullOrEmpty(dir) 
                        ? System.IO.Path.Combine(legacyUploadsPath, "construtora", item.ConstrutoraId.ToString())
                        : System.IO.Path.Combine(legacyUploadsPath, "construtora", item.ConstrutoraId.ToString(), dir);

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
                                item.ConstrutoraLogoUrl = string.IsNullOrEmpty(dir)
                                    ? $"/uploads/construtora/{item.ConstrutoraId}/{fileName}"
                                    : $"/uploads/construtora/{item.ConstrutoraId}/{dir}/{fileName}";
                                break;
                            }
                        }
                        catch { }
                    }
                }
            }
        }

        return list;
    }

    public async Task<IEnumerable<AutocompleteDto>> GetAutocompleteAsync(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return Enumerable.Empty<AutocompleteDto>();
        }

        var queryLower = query.ToLower();
        var results = new List<AutocompleteDto>();

        // 1. Search Cidades
        var cidades = await _context.Cidades
            .Where(c => c.Nome.ToLower().Contains(queryLower) && c.Status == "L")
            .Take(3)
            .Select(c => new AutocompleteDto { Id = c.Id, Texto = c.Nome, Tipo = "Cidade" })
            .ToListAsync();
        results.AddRange(cidades);

        // 2. Search Bairros
        var bairros = await _context.Bairros
            .Where(b => b.Nome.ToLower().Contains(queryLower))
            .Take(3)
            .Select(b => new AutocompleteDto { Id = b.Id, Texto = b.Nome, Tipo = "Bairro" })
            .ToListAsync();
        results.AddRange(bairros);

        // 3. Search Empreendimentos
        var emps = await _context.Empreendimentos
            .Where(e => e.Nome.ToLower().Contains(queryLower) && e.Status == "Liberado")
            .Take(5)
            .Select(e => new AutocompleteDto { Id = e.Id, Texto = e.Nome, Tipo = "Empreendimento" })
            .ToListAsync();
        results.AddRange(emps);

        // 4. Search Construtoras
        var construtoras = await _context.Construtoras
            .Where(c => c.Nome.ToLower().Contains(queryLower) && c.Status == "Liberada")
            .Take(3)
            .Select(c => new AutocompleteDto { Id = c.Id, Texto = c.NomeAbreviado ?? c.Nome, Tipo = "Construtora" })
            .ToListAsync();
        results.AddRange(construtoras);

        return results;
    }
}
