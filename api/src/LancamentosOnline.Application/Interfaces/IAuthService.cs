using System.Threading.Tasks;
using LancamentosOnline.Application.DTOs;

namespace LancamentosOnline.Application.Interfaces;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
}
