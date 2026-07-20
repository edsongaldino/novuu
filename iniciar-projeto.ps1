# Script de inicialização local (Sem Docker)
# Atenção: Requer Node.js, .NET 9 SDK, e PostgreSQL (rodando na porta 5432 com senha '259864') instalados na máquina.

Write-Host "Iniciando a API .NET..." -ForegroundColor Cyan
Start-Process -FilePath "dotnet" -ArgumentList "run" -WorkingDirectory ".\api\src\LancamentosOnline.WebApi" -WindowStyle Normal

Write-Host "Iniciando o Portal Angular..." -ForegroundColor Green
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm install && npm start" -WorkingDirectory ".\portal" -WindowStyle Normal

Write-Host "Iniciando o Painel Admin Angular..." -ForegroundColor Yellow
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm install && npm start -- --port 4201" -WorkingDirectory ".\painel" -WindowStyle Normal

Write-Host "Processos iniciados em janelas separadas!" -ForegroundColor Magenta
Write-Host "Portal em http://localhost:4200"
Write-Host "Painel em http://localhost:4201"
Write-Host "API em http://localhost:5135"
