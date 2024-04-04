using BookingTickets.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.User.Controllers;
[Area("user")]
[Route("user/api/freeway")]
public class FreewayController : Controller
{

    private readonly IFreewayService _freewayService;

    public FreewayController(IFreewayService freewayService)
    {
        _freewayService = freewayService;
    }

    [HttpGet("getAllPlaceFrom")]
    [Produces("application/json")]
    public IActionResult GetAllPlaceFrom()
    {
        try
        {
            return Ok(_freewayService.GetAllPlaceFrom());
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("getAllFreeway")]
    [Produces("application/json")]
    public IActionResult GetAllFreeway()
    {
        try
        {
            return Ok(_freewayService.GetAllFreeway());
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("getPopularFreewaybyIdPlacefrom/{id_placefrom}")]
    [Produces("application/json")]
    public IActionResult GetPopularFreewaybyIdPlacefrom(int id_placefrom)
    {
        try
        {
            return Ok(_freewayService.GetPopularFreewaybyIdPlacefrom(id_placefrom));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("getPlaceTo/{id_placefrom}")]
    [Produces("application/json")]
    public IActionResult GetPlaceTo(int id_placefrom)
    {
        try
        {
            return Ok(_freewayService.GetPlaceTo(id_placefrom));
        }
        catch
        {
            return BadRequest();
        }
    }    
    [HttpGet("checkFreeway/{id_placefrom}/{id_placeto}/{departing}")]
    [Produces("application/json")]
    public IActionResult CheckFreeWay(int id_placefrom,int id_placeto,string departing)
    {
        try
        {
            return Ok(_freewayService.CheckFreeWay(id_placefrom,id_placeto,departing));
        }
        catch
        {
            return BadRequest();
        }
    }
}
