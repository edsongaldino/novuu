FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar csproj e restaurar dependências (aproveita cache do Docker)
COPY ["src/LancamentosOnline.WebApi/LancamentosOnline.WebApi.csproj", "LancamentosOnline.WebApi/"]
COPY ["src/LancamentosOnline.Application/LancamentosOnline.Application.csproj", "LancamentosOnline.Application/"]
COPY ["src/LancamentosOnline.Infrastructure/LancamentosOnline.Infrastructure.csproj", "LancamentosOnline.Infrastructure/"]
COPY ["src/LancamentosOnline.Domain/LancamentosOnline.Domain.csproj", "LancamentosOnline.Domain/"]

RUN dotnet restore "LancamentosOnline.WebApi/LancamentosOnline.WebApi.csproj"

# Copiar o restante do código fonte
COPY src/ .

WORKDIR "/src/LancamentosOnline.WebApi"
RUN dotnet build "LancamentosOnline.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "LancamentosOnline.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Estágio final (imagem de runtime)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "LancamentosOnline.WebApi.dll"]
