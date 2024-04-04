using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace BookingTickets.Areas.User.Controllers;
[Area("user")]
[Route("user/api/invoice")]
public class InvoiceController : Controller
{
    private readonly IinvoiceShippingService _invoiceShipping;
    public InvoiceController(IinvoiceShippingService invoiceShipping)
    {
        _invoiceShipping = invoiceShipping;
    }

    [HttpPost("add")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] InvoiceShipping invoice)
    {
        try
        {
            return Ok(
             _invoiceShipping.Add(invoice)
            );
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
            return Ok(_invoiceShipping.GetById(id)
            );
        }
        catch
        {
            return BadRequest();
        }
    }


    [HttpGet("findTotal/{id}")]
    [Produces("application/json")]
    public IActionResult FindTotal(int id)
    {
        try
        {
            return Ok(_invoiceShipping.GetByTotal(id)
            );
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("findAll")]
    [Produces("application/json")]
    public IActionResult FindAll()
    {
        try
        {
            return Ok(_invoiceShipping.GetAllInvoice());
        }
        catch
        {
            return BadRequest("Error");
        }
    }

    [HttpGet("findAllByStatus/{id}")]
    [Produces("application/json")]
    public IActionResult FindAllByStatus(int id)
    {
        try
        {
            return Ok(_invoiceShipping.GetByIdInvoiceShipping(id));
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
                status = _invoiceShipping.Delete(id)
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
    public IActionResult UpdateInvoice([FromBody] InvoiceShipping invoice)
    {
        try
        {
            return Ok( _invoiceShipping.Update(invoice));
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.Message);
            return BadRequest("Wrong Path");
        }
    }

    [Produces("application/json")]
    [Consumes("application/json")]
    [HttpPut("updateStatus")]
    public IActionResult UpdateStatus([FromBody] InvoiceShipping invoice)
    {
        try
        {
            return Ok( _invoiceShipping.UpdateStatus(invoice)
            );
        }
        catch (Exception ex)
        {
            Debug.WriteLine(ex.Message);
            return BadRequest("Wrong Path");
        }
    }
}
