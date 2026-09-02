FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copiar csproj e restaurar dependências (aproveita cache do Docker)
COPY ["src/Novuu.WebApi/Novuu.WebApi.csproj", "Novuu.WebApi/"]
COPY ["src/Novuu.Application/Novuu.Application.csproj", "Novuu.Application/"]
COPY ["src/Novuu.Infrastructure/Novuu.Infrastructure.csproj", "Novuu.Infrastructure/"]
COPY ["src/Novuu.Domain/Novuu.Domain.csproj", "Novuu.Domain/"]

RUN dotnet restore "Novuu.WebApi/Novuu.WebApi.csproj"

# Copiar o restante do código fonte
COPY src/ .

WORKDIR "/src/Novuu.WebApi"
RUN dotnet build "Novuu.WebApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Novuu.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Estágio final (imagem de runtime)
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443

COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Novuu.WebApi.dll"]
