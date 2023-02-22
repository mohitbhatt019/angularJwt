using Employee_WebAPI_JWT_1.ServiceContract;
using Employee_WebAPI_JWT_1.ViewModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employee_WebAPI_JWT_1.Controllers
{
  [Route("api/account")]
  [ApiController]
  public class AccountController : Controller
  {
    private readonly IUserService _userService;
    public AccountController(IUserService userService)
    {
      _userService = userService;
    }

    [HttpPost]
    [Route("Authenticate")]
    public async Task<IActionResult> Authenticate([FromBody] LoginViewModel loginviewmodel)
    {
      var user = await _userService.Authenticate(loginviewmodel);
      if (user == null)
        return BadRequest(new { message = "Wrong User/pwd" });
      return Ok(user);

    }
  }
}
