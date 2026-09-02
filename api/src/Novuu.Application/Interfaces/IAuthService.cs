using System.Threading.Tasks;
using Novuu.Application.DTOs;

namespace Novuu.Application.Interfaces;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
}
