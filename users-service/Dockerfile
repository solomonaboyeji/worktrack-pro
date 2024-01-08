FROM mcr.microsoft.com/dotnet/sdk:8.0.100-1-alpine3.18-amd64 AS build-env

ENV COMPlus_EnableDiagnostics=0
WORKDIR /App

# Copy everything
COPY . ./
# Restore as distinct layers
RUN dotnet restore --disable-parallel

# Build and publish a release
RUN dotnet publish -c Release -o out

# Build runtime image
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /App
COPY --from=build-env /App/out .

RUN dotnet tool install --global dotnet-ef --version 3.1.2
ENV PATH="${PATH}:/root/.dotnet/tools"

# --- This is will be ran in the container
RUN Add-Migration InitiatedNewDatabase
RUN Update-Database
# --- This is will be ran in the container

EXPOSE 80

ENTRYPOINT ["dotnet", "JobTrackPro.dll"]