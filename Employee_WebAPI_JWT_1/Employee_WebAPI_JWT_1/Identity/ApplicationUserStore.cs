using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employee_WebAPI_JWT_1.Identity
{
  public class ApplicationUserStore : UserStore<ApplicationUser>
  {
    public ApplicationUserStore(ApplicationDbContext context) : base(context)
    {

    }
  }
}
