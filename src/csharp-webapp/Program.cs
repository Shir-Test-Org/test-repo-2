using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Command injection vulnerability (intentional for scanning)
app.MapGet("/exec", (string cmd) => {
    var process = Process.Start("cmd.exe", "/c " + cmd);
    return Results.Ok("Executed");
});

// XSS vulnerability (intentional for scanning)
app.MapGet("/greet", (HttpContext ctx) => {
    var name = ctx.Request.Query["name"];
    return Results.Content($"<html><body><h1>Hello {name}</h1></body></html>", "text/html");
});

// Open redirect vulnerability (intentional for scanning)
app.MapGet("/redirect", (string url) => Results.Redirect(url));

app.MapGet("/", () => "Code Scanning Test Web App");
app.Run();
