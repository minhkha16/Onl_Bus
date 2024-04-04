using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.User.Controllers;
[Area("user")]
[Route("user/api/workschedule")]
public class WorkScheduleController : Controller
{

    private readonly IWorkSchedulesService _IWorkSchedulesService;

    public WorkScheduleController(IWorkSchedulesService iWorkSchedulesService)
    {
        _IWorkSchedulesService = iWorkSchedulesService;
    }

    public IActionResult Index()
    {
        return View();
    }

    [HttpGet("worksheduleByIdAccount/{idAccount}/{status}")]
    [Produces("application/json")]
    public IActionResult WorkSchedule(int idAccount, string status)
    {
        try
        {

            return Ok(_IWorkSchedulesService.GetByIdAccount2(idAccount, status));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("search/{date}/{time}/{freeway}")]
    [Produces("application/json")]
    public IActionResult Search(string date, int time, int freeway)
    {
        try
        {
            return Ok(_IWorkSchedulesService.Search(freeway,time,date));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("getByIdAccount/{idAccount}")]
    [Produces("application/json")]
    public IActionResult GetByIdAccount(int idAccount)
    {
        try
        {

            return Ok(_IWorkSchedulesService.GetByIdAccount(idAccount));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("getByIdAccountAndStatusAndDateBook/{idAccount}/{status}/{dateBook}")]
    [Produces("application/json")]
    public IActionResult GetByIdAccountAndStatusAndDateBook(int idAccount, string status, string dateBook)
    {
        try
        {
            return Ok(_IWorkSchedulesService.GetByIdAccountAndStatusAndDateBook(idAccount, status, dateBook));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("getByStatusCompleted/{idAccount}/{status}")]
    [Produces("application/json")]
    public IActionResult GetByStatusCompleted(int idAccount, string status)
    {
        try
        {

            return Ok(_IWorkSchedulesService.GetByStatusCompleted(idAccount, status));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("getById/{idAccount}")]
    [Produces("application/json")]
    public IActionResult GetById(int idAccount)
    {
        try
        {
            return Ok(_IWorkSchedulesService.GetById(idAccount));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpPost("update")]
    [Consumes("application/json")]
    public IActionResult UpdateSchedules([FromBody] WorkSchedule ws)
    {
        try
        {
            return Ok(_IWorkSchedulesService.Update(ws));
        }
        catch
        {
            return BadRequest();
        }
    }


    [HttpPost("addWorkSchedules")]
    [Consumes("application/json")]
    public IActionResult AddWorkSchedules([FromBody] WorkSchedule ws)
    {
        try
        {
            return Ok(_IWorkSchedulesService.Add(ws));
        }
        catch
        {
            return BadRequest();
        }
    }

}
