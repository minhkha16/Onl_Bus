using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.Admin.Controllers;
[Area("user")]
[Route("user/api/category")]
public class CategorysController : Controller

{
    private ICategoryService categoryService;

    public CategorysController(ICategoryService categoryService)
    {
        this.categoryService = categoryService;
    }

    [HttpPost("addcate")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] CategoryCar a)
    {
        try
        {
            return Ok(categoryService.Add(a));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpDelete("deletecate")]
    [Consumes("application/json")]
    public IActionResult DeleteCar(int id)
    {
        try
        {
            return Ok(categoryService.Delete(id));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpPut("editcate")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult EditTimeLine([FromBody] CategoryCar a)
    {
        try
        {
            return Ok(categoryService.Update(a));
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
            return Ok(  categoryService.GetAllCategory());
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
            return Ok(categoryService.GetById(id));
        }
        catch
        {
            return BadRequest();
        }
    }
}
