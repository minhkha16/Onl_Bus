using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/discount")]
public class DiscountController : Controller
{
    private readonly IDiscountService discountService;

    public DiscountController(IDiscountService _discountService)
    {
        discountService = _discountService;
    }

    [HttpPost("addDis")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] Discount a)
    {
        try
        {
            return Ok(discountService.Add(a));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpDelete("delete")]
    [Consumes("application/json")]
    public IActionResult DeleteCar(int id)
    {
        try
        {
            return Ok(discountService.Delete(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpPut("edit")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult EditTimeLine([FromBody] Discount a)
    {
        try
        {
            return Ok(discountService.Update(a));
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
            return Ok(discountService.GetAllDiscount());
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("getid/{id}")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult GetId(int id)
    {
        try
        {
            return Ok(discountService.GetById(id));
        }
        catch
        {
            return BadRequest();
        }
    }
}
