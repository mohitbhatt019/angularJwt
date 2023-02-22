using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employee_WebAPI_JWT_1
{
  public class ConfigureSwaggerOptions : IConfigureOptions<SwaggerGenOptions>
  {
    public void Configure(SwaggerGenOptions options)
    {
      //GUI
      options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
      {
        Description = "JWT Authorization header using the Bearer Scheme\r\n\r\n." +
          "Enter 'Bearer' [space] and then your token in the text input below \r\n\r\n" +
          "Example:Bearer 12345abcder \r\n" +
          "Name:Authorization \r\n" +
          "In:header",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
      });

      //*********** it will work
      options.AddSecurityRequirement(new OpenApiSecurityRequirement(){
                {
                    new OpenApiSecurityScheme{
                        Reference=new OpenApiReference
                        {
                            Type=ReferenceType.SecurityScheme,
                            Id="Bearer"
                        },
                        Scheme="oauth2",
                        Name="Bearer",
                        In=ParameterLocation.Header
                    },
                    new List<string>()
                }
            });
    }
  }
}
