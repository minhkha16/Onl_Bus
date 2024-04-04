using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/shipping")]
public class ShippingController : Controller
{
    private readonly IShippingService iShippingService;

    public ShippingController(IShippingService _iShippingService)
    {
        iShippingService = _iShippingService;
    }
    [HttpPost("add")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] Shipping a)
    {
        try
        {
            return Ok(iShippingService.Add(a));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpDelete("delete")]
    [Consumes("application/json")]
    public IActionResult DeleteFreeway(int id)
    {
        try
        {
            return Ok(iShippingService.Delete(id));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpPut("edit")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult EditTimeLine([FromBody] Shipping a)
    {
        try
        {
            return Ok(iShippingService.Update(a));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("findAll")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult FindAll()
    {
        try
        {
            return Ok(iShippingService.GetAll());
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("find")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult Find(int id)
    {
        try
        {
            return Ok(iShippingService.GetById(id));
        }
        catch
        {
            return BadRequest();
        }
    }
}
