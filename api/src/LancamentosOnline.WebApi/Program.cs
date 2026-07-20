using Microsoft.EntityFrameworkCore;
using LancamentosOnline.Infrastructure.Data;
using LancamentosOnline.Application.Interfaces;
using LancamentosOnline.Application.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// Add Database Context
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
        b => b.MigrationsAssembly("LancamentosOnline.Infrastructure")));

// Add Services & DI
builder.Services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
builder.Services.AddScoped<IEmpreendimentoService, EmpreendimentoService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ILeadService, LeadService>();
builder.Services.AddScoped<IChatService, ChatService>();
builder.Services.AddScoped<IPropostaService, PropostaService>();

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

// Only enforce HTTPS in production to simplify local HTTP communication
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

// Enable CORS and Routing for Controllers
app.UseCors();

app.UseStaticFiles();

var legacyUploadsPat = @"C:\laragon\www\lancamentos\public\uploads";
if (System.IO.Directory.Exists(legacyUploadsPat))
{
    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new Microsoft.Extensions.FileProviders.PhysicalFileProvider(legacyUploadsPat),
        RequestPath = "/uploads"
    });
}

app.MapControllers();

app.Run();
