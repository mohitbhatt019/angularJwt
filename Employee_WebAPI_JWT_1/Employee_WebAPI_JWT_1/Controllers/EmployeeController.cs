using Employee_WebAPI_JWT_1.Identity;
using Employee_WebAPI_JWT_1.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Employee_WebAPI_JWT_1.Controllers
{
  [Route("api/employee")]
  [ApiController]
  [Authorize]
  public class EmployeeController : Controller
  {
    private readonly ApplicationDbContext _context;
    public EmployeeController(ApplicationDbContext  context)
    {
      _context = context;
    }

    [HttpGet]
    public IActionResult GetEmployees()
    {
      return Ok(_context.Employees.ToList());
    }

    [HttpPost]
    public IActionResult SaveEmployee([FromBody] Employee employee)
    {
      if (employee == null) return NotFound();
      if (!ModelState.IsValid) return BadRequest();
      _context.Employees.Add(employee);
      _context.SaveChanges();
      return Ok();
    }

    [HttpPut]
    public IActionResult UpdateEmployee([FromBody] Employee employee)
    {
      if (employee == null) return NotFound();
      if (!ModelState.IsValid) return BadRequest();
      _context.Employees.Update(employee);
      _context.SaveChanges();
      return Ok();
    }

    [HttpDelete("{id:int}")]
    public IActionResult DeleteEmployee(int id)
    {
      var employeeInDb = _context.Employees.Find(id);
      if (employeeInDb == null) return NotFound();
      _context.Employees.Remove(employeeInDb);
      _context.SaveChanges();
      return Ok();
    }

  }
}
