using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BookingTickets.Areas.User.Controllers;
[Area("user")]
[Route("user/api/shipping")]
public class ShippingController : Controller
{
    private readonly IShippingService _iShippingService;
    public ShippingController(IShippingService iShippingService)
    {
        _iShippingService = iShippingService;
    }


    [HttpPost("add")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] Shipping ship)
    {
        try
        {
            return Ok(new
            {
                status = _iShippingService.Add(ship)
            });
        }
        catch
        {
            return BadRequest("Error");
        }
    }

    [HttpGet("findby")]
    [Produces("application/json")]
    public IActionResult Findby(string pakage)
    {
        try
        {
            return Ok(_iShippingService.GetByIdp(pakage));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("find/{id}")]
    [Produces("application/json")]
    public IActionResult Find(int id)
    {
        try
        {
            return Ok(_iShippingService.GetById(id)
            );
        }
        catch
        {
            return BadRequest();
        }
    }


    [HttpGet("findByPrice/{id}")]
    [Produces("application/json")]
    public IActionResult FindByPrice(int id)
    {
        try
        {
            return Ok(_iShippingService.GetByIdButPrice(id)
            );
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("findAll")]
    [Produces("application/json")]
    public IActionResult FindAll()
    {
        try
        {
            return Ok(_iShippingService.GetAllShipping());
        }
        catch
        {
            return BadRequest("Error");
        }
    }

    [HttpGet("delete/{id}")]
    [Produces("application/json")]
    public IActionResult Remove(int id)
    {
        try
        {
            return Ok(new
            {
                status = _iShippingService.Delete(id)
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
    public IActionResult UpdateShipping([FromBody] Shipping ship)
    {
        try
        {
            return Ok(new
            {
                status = _iShippingService.Update(ship)
            });
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.Message);
            return BadRequest("Wrong Path");
        }
    }
}
