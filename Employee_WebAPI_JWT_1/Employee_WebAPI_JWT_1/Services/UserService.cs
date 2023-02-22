using Employee_WebAPI_JWT_1.Identity;
using Employee_WebAPI_JWT_1.ServiceContract;
using Employee_WebAPI_JWT_1.Utility;
using Employee_WebAPI_JWT_1.ViewModel;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Employee_WebAPI_JWT_1.Services
{
  public class UserService : IUserService
  {
    private readonly ApplicationUserManager _applicationUserManager;
    private readonly ApplicationSignInManager _applicationSignInManager;
    private readonly AppSettings _appSettings;
    public UserService(ApplicationUserManager applicationUserManager,
      ApplicationSignInManager applicationSignInManager,IOptions<AppSettings>appSettings)
    {
      _applicationUserManager = applicationUserManager;
      _applicationSignInManager = applicationSignInManager;
      _appSettings = appSettings.Value;
    }
    public async Task<ApplicationUser> Authenticate(LoginViewModel loginViewModel)
    {
      var result = await _applicationSignInManager.PasswordSignInAsync(loginViewModel.UserName, loginViewModel.Password, false, false);
      if (result.Succeeded)
      {
        var applicationUser = await _applicationUserManager.FindByNameAsync(loginViewModel.UserName);
        applicationUser.PasswordHash = "";
        //JWT
        if (await _applicationUserManager.IsInRoleAsync(applicationUser, SD.Role_Admin))  //it is checking that if user role is admin then role will dtore in application user.role
          applicationUser.Role = SD.Role_Admin;
        if (await _applicationUserManager.IsInRoleAsync(applicationUser, SD.Role_Employee))
          applicationUser.Role = SD.Role_Employee;
        var tokenHandler = new JwtSecurityTokenHandler();     //key
        var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
        var tokenDescritor = new SecurityTokenDescriptor()
        {
          Subject = new ClaimsIdentity(new Claim[]
            {
                    new Claim(ClaimTypes.Name,applicationUser.Id),
                    new Claim(ClaimTypes.Email,applicationUser.Email),
                    new Claim(ClaimTypes.Role,applicationUser.Role)
            }),
          Expires = DateTime.UtcNow.AddHours(30),
          SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
            SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescritor);
        applicationUser.Token = tokenHandler.WriteToken(token);

        return applicationUser;
      }
      else
      {
        return null;
      }
    }
  }
}
