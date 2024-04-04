using BookingTickets.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.User.Controllers;
[Area("user")]
[Route("user/api/timeline")]
public class TimeLineController : Controller
{

    private readonly ITimeService _timeService;

    public TimeLineController(ITimeService timeService)
    {
        _timeService = timeService;
    }

    [HttpGet("getAll")]
    [Produces("application/json")]
    public IActionResult Index()
    {
        try
        {
            return Ok(_timeService.GetAll());
        }
        catch
        {
            return BadRequest();
        }
    }
}
