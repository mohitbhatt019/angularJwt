using Employee_WebAPI_JWT_1.Identity;
using Employee_WebAPI_JWT_1.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employee_WebAPI_JWT_1.ServiceContract
{
  public interface IUserService
  {
    Task<ApplicationUser> Authenticate(LoginViewModel loginViewModel);
  }
}
