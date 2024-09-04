using System.Text.Json.Serialization;
using Asp.Versioning;
using Serilog;
using Serilog.Events;
using Serilog.Filters;
using Serilog.Formatting.Json;
using Serilog.Sinks.SystemConsole.Themes;
using TrainingAssignmentsApi.DataAccess;
using TrainingAssignmentsApi.DataAccess.InMemory;
using TrainingAssignmentsApi.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddSingleton<ISchedulerService, SchedulerService>();
builder.Services.AddSingleton<IAssignmentsDataAccessService, InMemoryAssignmentsDataAccessService>();
builder.Services.AddSingleton<IPreferencesDataAccessService, InMemoryPreferencesDataAccessService>();


// API, Controllers
builder.Services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
builder.Services.AddSwaggerGen();
builder.Services.AddApiVersioning(options => {
    options.DefaultApiVersion = new ApiVersion(1);
    options.ReportApiVersions = true;
    options.AssumeDefaultVersionWhenUnspecified = true;
}).AddApiExplorer(options => {
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});

// Logging
var logDirectory = builder.Configuration.GetSection("Logging").GetValue<string>("Directory");
var fileSizeLimitBytes = builder.Configuration.GetSection("Logging").GetValue<int>("FileSizeLimit");
Log.Logger = new LoggerConfiguration().MinimumLevel.Debug().Enrich.FromLogContext()
    .MinimumLevel.Override("Microsoft.AspNetCore.Hosting", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Mvc", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore.Routing", LogEventLevel.Warning)
    .WriteTo.File(
        formatter: new JsonFormatter(renderMessage: true),
        path: $"{logDirectory}/log_splunk.log",
        shared: true,
        rollingInterval: RollingInterval.Day,
        rollOnFileSizeLimit: true,
        fileSizeLimitBytes: fileSizeLimitBytes,
        retainedFileCountLimit: 5
    )
    .WriteTo.File(
        path: $"{logDirectory}/log_human.log",
        shared: true,
        rollingInterval: RollingInterval.Day,
        rollOnFileSizeLimit: true,
        fileSizeLimitBytes: fileSizeLimitBytes,
        retainedFileCountLimit: 5
    )
    .Filter.ByExcluding(Matching.WithProperty("RequestPath", "/status"))
    .Filter.ByExcluding(Matching.WithProperty("RequestPath", "/favicon.ico"))
    .WriteTo.Console(theme: AnsiConsoleTheme.Literate)
    .CreateLogger();
builder.Services.AddSerilog();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "AllowAll",
                      policy  =>
                      {
                          policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
                      });
});

var app = builder.Build();
app.UseSerilogRequestLogging();

app.UseSwagger();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

app.Run();
