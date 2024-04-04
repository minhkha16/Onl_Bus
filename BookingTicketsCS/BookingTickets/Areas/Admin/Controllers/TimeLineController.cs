using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;
using BookingTickets.Interfaces;

namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/timeline")]
public class TimeLineController : Controller
{
    private readonly ITimeService timeService;

    public TimeLineController(ITimeService _timeService)
    {
        timeService = _timeService;
    }
    [HttpPost("addTimeline")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] TimeLine time)
    {
        try
        {
            return Ok(timeService.Add(time));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpDelete("deletetimeLine")]
    [Consumes("application/json")]
    public IActionResult DeleteTimeLine(int id)
    {
        try
        {
            return Ok(timeService.Delete(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpPut("editTimeLine")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult EditTimeLine([FromBody] TimeLine time)
    {
        try
        {
            return Ok(timeService.Update(time));
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
            return Ok(timeService.FineAll());
        }
        catch
        {
            return BadRequest();
        }
    }


    [HttpGet("getId")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult GetById(int id)
    {
        try
        {
            return Ok(timeService.GetById(id));
        }
        catch
        {
            return BadRequest();
        }
    }
}
