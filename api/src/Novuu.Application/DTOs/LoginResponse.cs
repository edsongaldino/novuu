namespace Novuu.Application.DTOs;

public class LoginResponse
{
    public string Token { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public int ConstrutoraId { get; set; }
}
