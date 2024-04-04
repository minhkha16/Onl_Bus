using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BookingTickets.Areas.User.Controllers;
[Area("user")]
[Route("user/api/categoryCar")]
public class CategoryController : Controller
{
    private readonly ICategoryService _iCategoryService;
    public CategoryController(ICategoryService iCategoryService)
    {
        _iCategoryService = iCategoryService;
    }

    [HttpPost("addCate")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] CategoryCar categoryCar)
    {
        try
        {
            return Ok(new
            {
                status = _iCategoryService.Add(categoryCar)
            });
        }
        catch
        {
            return BadRequest("Error");
        }
    }

    [HttpGet("find/{id}")]
    [Produces("application/json")]
    public IActionResult Find(int id)
    {
        try
        {
            return Ok(_iCategoryService.GetById(id)
            );
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("getAllCategory")]
    [Produces("application/json")]
    public IActionResult FindAll()
    {
        try
        {
            return Ok(_iCategoryService.GetAllCategory());
        }
        catch
        {
            return BadRequest("Error");
        }
    }

    [HttpGet("delete/{id}")]
    [Produces("application/json")]
    public IActionResult Remove(int id)
    {
        try
        {
            return Ok(new
            {
                status = _iCategoryService.Delete(id)
            });
        }
        catch
        {
            return BadRequest();
        }
    }

    [Produces("application/json")]
    [Consumes("application/json")]
    [HttpPut("update")]
    public IActionResult UpdateCar([FromBody] CategoryCar cate)
    {
        try
        {
            return Ok(new
            {
                status = _iCategoryService.Update(cate)
            });
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.Message);
            return BadRequest("Wrong Path");
        }
    }
}
