using Microsoft.AspNetCore.Mvc;
using BookingTickets.Interfaces;
using BookingTickets.Models;

namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/placeto")]
public class PlaceTosController : Controller
{
    private readonly IPlaceToService placeTo;


    public PlaceTosController(IPlaceToService _placeTo)
    {
        placeTo = _placeTo;
    }
    [HttpPost("addplaceTo")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] PlaceTo a)
    {
        try
        {
            return Ok(placeTo.Add(a));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("findAll")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult FindAll(string line)
    {
        try
        {
            return Ok(placeTo.FineAll());
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpDelete("deleteplaceTo")]
    [Consumes("application/json")]
    public IActionResult DeletePlaceTo(int id)
    {
        try
        {
            return Ok(placeTo.Delete(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpPut("editplaceTo")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult EditPlaceTo([FromBody] PlaceTo a)
    {
        try
        {
            return Ok(placeTo.Update(a));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("getid")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult GetId(int id)
    {
        try
        {
            return Ok(placeTo.GetById(id));
        }
        catch
        {
            return BadRequest();
        }
    }
}
