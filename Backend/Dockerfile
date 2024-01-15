# Use the official Microsoft SDK image to build the project
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src

# Copy the CSPROJ file and restore any dependencies (via NUGET)
COPY ["Backend/GradApp/GradApp.csproj", "GradApp/"]
RUN dotnet restore "GradApp/GradApp.csproj"

# Copy the project files and build the release
COPY . .
WORKDIR "/src/GradApp"
RUN dotnet build "GradApp.csproj" -c Release -o /app/build

# Publish the application to the build folder
FROM build AS publish
RUN dotnet publish "GradApp.csproj" -c Release -o /app/publish

# Final stage/image
# Use the official Microsoft ASP.NET Core runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS final
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 80


ENTRYPOINT ["dotnet", "GradApp.dll"]
