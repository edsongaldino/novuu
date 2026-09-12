using Microsoft.EntityFrameworkCore;
using Novuu.Infrastructure.Data;
using Novuu.Application.Interfaces;
using Novuu.Application.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add Database Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("Novuu.Infrastructure")));

// Add Services & DI
builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
builder.Services.AddScoped<IEmpreendimentoService, EmpreendimentoService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ILeadService, LeadService>();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddScoped<IPropostaService, PropostaService>();

var spacesAccessKey = builder.Configuration["SpacesAccessKey"];
var spacesSecretKey = builder.Configuration["SpacesSecretKey"];
if (!string.IsNullOrWhiteSpace(spacesAccessKey) && !string.IsNullOrWhiteSpace(spacesSecretKey))
{
    var s3Config = new Amazon.S3.AmazonS3Config
    {
        ServiceURL = "https://nyc3.digitaloceanspaces.com",
        ForcePathStyle = false // For DO Spaces, path style should be false to use virtual host URLs
    };
    builder.Services.AddSingleton<Amazon.S3.IAmazonS3>(new Amazon.S3.AmazonS3Client(spacesAccessKey, spacesSecretKey, s3Config));
}

// Add CORS Policy to allow frontend applications to connect
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Seed Database on startup
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<ApplicationDbContext>();
        DbInitializer.Seed(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while seeding the database.");
    }
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference(); // Exposes Scalar API documentation at /scalar/v1
}

// HttpsRedirection removed because Traefik handles SSL and redirects.

// Enable CORS and Routing for Controllers
app.UseCors();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        context.Response.StatusCode = 500;
        context.Response.ContentType = "application/json";
        var exceptionHandlerPathFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerPathFeature>();
        var exception = exceptionHandlerPathFeature?.Error;
        
        // Retorna o erro real para o frontend em vez de omitir o corpo
        await context.Response.WriteAsJsonAsync(new { 
            error = exception?.Message, 
            stackTrace = exception?.StackTrace,
            inner = exception?.InnerException?.Message
        });
    });
});

app.UseStaticFiles();

var legacyUploadsPath = builder.Configuration["UploadsPath"] ?? @"C:\laragon\www\lancamentos\public\uploads";
if (System.IO.Directory.Exists(legacyUploadsPath))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(legacyUploadsPath),
        RequestPath = "/uploads"
    });
}

app.MapGet("/ping", () => "pong");
app.MapControllers();

app.Run();
