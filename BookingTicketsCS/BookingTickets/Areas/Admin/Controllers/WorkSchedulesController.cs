using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/workschedules")]
public class WorkSchedulesController : Controller
{
    private readonly IWorkSchedulesService workSchedulesService;

    public WorkSchedulesController(IWorkSchedulesService workSchedulesService)
    {
        this.workSchedulesService = workSchedulesService;
    }

    [HttpPost("addword")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] WorkSchedule word)
    {
        try
        {
            return Ok(workSchedulesService.Add(word));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpDelete("deleteword")]
    [Consumes("application/json")]
    public IActionResult DeleteWord(int id)
    {
        try
        {
            return Ok(workSchedulesService.Delete(id));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpPut("editword")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult Edit([FromBody] WorkSchedule word)
    {
        try
        {
            return Ok(workSchedulesService.Update(word));
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
            return Ok(workSchedulesService.findAll());
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("findCar")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult FindCar(string id)
    {
        try
        {
            return Ok(workSchedulesService.findCar(id));
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
            return Ok(workSchedulesService.GetById(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("search")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult Search(string date)
    {
        try
        {
            return Ok(workSchedulesService.GetByIdWorkDay(DateTime.ParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture)));
        }
        catch
        {
            return BadRequest();
        }
    }
}
