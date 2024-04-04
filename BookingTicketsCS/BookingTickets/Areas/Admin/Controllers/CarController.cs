using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/car")]
public class CarController : Controller
{
    private readonly ICarService carService;

    public CarController(ICarService carService)
    {
        this.carService = carService;
    }

    [HttpPost("addcar")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] Car a)
    {
        try
        {
            return Ok(carService.Add(a));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpDelete("deletecar")]
    [Consumes("application/json")]
    public IActionResult DeleteCar(string licensePlates)
    {
        try
        {
            return Ok(carService.Delete(licensePlates));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpPut("editcar")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult EditTimeLine([FromBody] Car a)
    {
        try
        {
            return Ok(carService.Update(a));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("findallcar")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult FindAll()
    {
        try
        {
            return Ok(carService.GetAllCar());
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("getid")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult GetId(string id)
    {
        try
        {
            return Ok(carService.GetById(id));
        }
        catch
        {
            return BadRequest();
        }
    }

}
