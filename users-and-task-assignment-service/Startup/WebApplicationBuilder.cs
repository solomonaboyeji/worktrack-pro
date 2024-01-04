namespace JobTrackPro.Startup
{
    public static class WebApplicationBuilder
    {
         public static IHostBuilder ConfigureAppSettings(this IHostBuilder host)
        {
            host.ConfigureAppConfiguration((ctx, builder) =>
            {
                builder.AddJsonFile("appsettings.json", false, true);
                builder.AddEnvironmentVariables();
            });
            return host;
        }
    }
}
