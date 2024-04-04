using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;


namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/freeway")]
public class FreewayController : Controller
{
    private readonly IFreewayService freewayService;

    public FreewayController(IFreewayService _freewayService)
    {
        freewayService = _freewayService;
    }
    [HttpPost("add")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] Freeway a)
    {
        try
        {
            return Ok(freewayService.Add(a));
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
            return Ok(freewayService.Delete(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpPut("edit")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult EditTimeLine([FromBody] Freeway a)
    {
        try
        {
            return Ok(freewayService.Update(a));
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
            return Ok(freewayService.FindAll());
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
            return Ok(freewayService.GetById(id));
        }
        catch
        {
            return BadRequest();
        }
    }
}
