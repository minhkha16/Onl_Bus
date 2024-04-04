using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/chaircar")]
public class ChairCarController : Controller
{
    private IChairCarService chairCarService;

    public ChairCarController(IChairCarService chairCarService)
    {
        this.chairCarService = chairCarService;
    }

    [HttpPost("add")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] ChairCar a)
    {
        try
        {
            return Ok(chairCarService.Create(a));
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
            return Ok(chairCarService.Delete(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpPut("edit")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult EditTimeLine([FromBody] ChairCar a)
    {
        try
        {
            return Ok(chairCarService.Update(a));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("findall")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult FindAll()
    {
        try
        {
            return Ok(chairCarService.GetAll());
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("getIdChairCar/{idChair}/{idCar}/{idTimeLine}")]
    [Produces("application/json")]
    public IActionResult GetIdChairCar(int idChair, string idCar, int idTimeLine)
    {
        try
        {
            return Ok(chairCarService.GetIdChairCar(idChair, idCar, idTimeLine));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("checkSubject/{idChair}/{idCar}/{idTimeLine}")]
    [Produces("application/json")]
    public IActionResult CheckSubject(int idChair, string idCar, int idTimeLine)
    {
        try
        {
            return Ok(chairCarService.CheckSubject(idChair, idCar, idTimeLine));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("getByIdCar/{idCar}")]
    [Produces("application/json")]
    public IActionResult GetByIdCar(string idCar)
    {
        try
        {
            return Ok(chairCarService.GetByIdCar(idCar));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("GetByIdCarAndIdTimeLineAndDateBook/{idCar}/{idTimeLine}/{dateBook}")]
    [Produces("application/json")]
    public IActionResult GetByIdCar(string idCar, int idTimeLine, string dateBook)
    {
        try
        {
            return Ok(chairCarService.GetByIdCarAndIdTimeLineAndDateBook(idCar, idTimeLine, dateBook));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("countTheChairAvailable/{idCar}/{idTimeLine}/{dateBook}")]
    [Produces("application/json")]
    public IActionResult CountTheChairAvailable(string idCar, int idTimeLine, string dateBook)
    {
        try
        {
            return Ok(chairCarService.CountTheChairAvailable(idCar, idTimeLine, dateBook));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("getByIdChairAndIdCarAndDateBook/{idChair}/{idCar}/{dateBook}")]
    [Produces("application/json")]
    public IActionResult GetByIdChairAndIdCar(int idChair, string idCar, string dateBook)
    {
        try
        {
            return Ok(chairCarService.GetByIdCharAndIdCarAndDateBook(idChair, idCar, dateBook));
        }
        catch
        {
            return BadRequest();
        }
    }
}
