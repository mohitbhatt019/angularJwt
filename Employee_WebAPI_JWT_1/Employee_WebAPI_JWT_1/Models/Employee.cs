using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employee_WebAPI_JWT_1.Models
{
  public class Employee
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public int Salary { get; set; }
  }
}
