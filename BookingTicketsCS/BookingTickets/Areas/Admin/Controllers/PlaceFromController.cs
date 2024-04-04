using Microsoft.AspNetCore.Mvc;
using BookingTickets.Interfaces;
using BookingTickets.Models;


namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/placefrom")]
public class PlaceFromController : Controller
{
    private readonly IPlaceFromService fromService;

    public PlaceFromController(IPlaceFromService _fromService)
    {
        fromService = _fromService;
    }
    [HttpPost("addplacefrom")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] PlaceFrom a)
    {
        try
        {
            return Ok(fromService.Add(a));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpDelete("deleteplacefrom")]
    [Consumes("application/json")]
    public IActionResult DeletePlaceFrom(int id)
    {
        try
        {
            return Ok(fromService.Delete(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpPut("editplacefrom")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult Editplacefrom([FromBody] PlaceFrom a)
    {
        try
        {
            return Ok(fromService.Update(a));
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
            return Ok(fromService.FineAll());
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
            return Ok(fromService.GetById(id));
        }
        catch
        {
            return BadRequest();
        }
    }
}
