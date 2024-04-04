using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BookingTickets.Areas.User.Controllers;
[Area("user")]
[Route("user/api/discount")]
public class DiscountController : Controller
{
    private readonly IDiscountService _iDiscountService;
    public DiscountController(IDiscountService iDiscountService)
    {
        _iDiscountService = iDiscountService;
    }

    [HttpPost("add")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] Discount dis)
    {
        try
        {
            return Ok(new
            {
                status = _iDiscountService.Add(dis)
            });
        }
        catch
        {
            return BadRequest("Error");
        }
    }

    [HttpGet("find/{id}")]
    [Produces("application/json")]
    public IActionResult Find(int id)
    {
        try
        {
            return Ok(_iDiscountService.GetById(id)
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
            return Ok(_iDiscountService.GetAllDiscount());
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
                status = _iDiscountService.Delete(id)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("getByCode/{idAccount}/{code}")]
    [Produces("application/json")]
    public IActionResult GetByCode(int idAccount, string code)
    {
        try
        {
            return Ok(_iDiscountService.GetByCode(idAccount, code));
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [Consumes("application/json")]
    [HttpPut("update")]
    public IActionResult UpdateDiscount([FromBody] Discount dis)
    {
        try
        {
            return Ok(new
            {
                status = _iDiscountService.Update(dis)
            });
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.Message);
            return BadRequest("Wrong Path");
        }
    }
}
