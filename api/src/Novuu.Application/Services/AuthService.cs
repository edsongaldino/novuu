using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Novuu.Application.DTOs;
using Novuu.Application.Interfaces;

namespace Novuu.Application.Services;

public class AuthService : IAuthService
{
    private readonly IApplicationDbContext _context;

    public AuthService(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email && u.PasswordHash == request.Password);

        if (user == null) return null;

        return new LoginResponse
        {
            Token = "mock-jwt-token-admin-plaenge",
            UserName = user.Name,
            ConstrutoraId = user.ConstrutoraId ?? 0
        };
    }
}
