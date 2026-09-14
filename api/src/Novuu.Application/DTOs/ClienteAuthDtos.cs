namespace Novuu.Application.DTOs;

public class ClienteLoginRequest
{
    public string Email { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
}

public class ClienteRegisterRequest
{
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Senha { get; set; } = string.Empty;
}

public class ClienteGoogleLoginRequest
{
    public string Credential { get; set; } = string.Empty; // O JWT do Google
}

public class ClienteAuthResponse
{
    public int ClienteId { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? FotoUrl { get; set; }
    public string Token { get; set; } = string.Empty;
}
