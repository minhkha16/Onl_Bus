using BookingTickets.Interfaces;
using BookingTickets.Models;
using Castle.Core.Resource;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BookingTickets.Areas.User.Controllers;
[Area("user")]
[Route("user/api/car")]
public class CarController : Controller
{
    private readonly ICarService _iCarService;
    public CarController(ICarService iCarService)
    {
        _iCarService = iCarService;
    }

    [HttpPost("add")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] Car car)
    {
        try
        {
            return Ok(new
            {
                status = _iCarService.Add(car)
            });
        }
        catch
        {
            return BadRequest("Error");
        }
    }

    [HttpGet("find/{licensePlates}")]
    [Produces("application/json")]
    public IActionResult Find(string licensePlates)
    {
        try
        {
            return Ok(_iCarService.GetByLicensePlates(licensePlates)
            );
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("searchCarByCate/{id_time}/{id_freeway}/{id_Cate}/{departing}")]
    [Produces("application/json")]
    public IActionResult SearchCarByCate(int id_time, int id_freeway, int id_cate, string departing)
    {
        try
        {
            return Ok(_iCarService.SearchCarByCate(id_time, id_freeway, id_cate, departing));
        }
        catch
        {
            return BadRequest("Error");
        }
    }
    [HttpGet("getAllCar/{id_time}/{id_freeway}/{departing}")]
    [Produces("application/json")]
    public IActionResult GetAll(int id_time, int id_freeway, string departing)
    {
        try
        {
            return Ok(_iCarService.GetAllCar(id_time, id_freeway, departing));
        }
        catch
        {
            return BadRequest("Error");
        }
    }

    [HttpGet("delete/{licensePlates}")]
    [Produces("application/json")]
    public IActionResult Remove(string licensePlates)
    {
        try
        {
            return Ok(new
            {
                status = _iCarService.Delete(licensePlates)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [Consumes("application/json")]
    [HttpPut("update")]
    public IActionResult UpdateCar([FromBody] Car car)
    {
        try
        {
            return Ok(new
            {
                status = _iCarService.Update(car)
            });
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.Message);
            return BadRequest("Wrong Path");
        }
    }


}
