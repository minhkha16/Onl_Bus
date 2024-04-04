using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.User.Controllers;
[Area("user")]
[Route("user/api/invoiceCarDetail")]
public class InvoiceCarDetailController : Controller
{

    private readonly IInvoiceDetailCarService _invoiceDetailCarService;

    public InvoiceCarDetailController(IInvoiceDetailCarService invoiceDetailCarService)
    {
        _invoiceDetailCarService = invoiceDetailCarService;
    }
    [HttpPost("add")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] InvoiceDetailCar invoiceDetailCar)
    {
        try
        {
            return Ok(_invoiceDetailCarService.Add(invoiceDetailCar));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpDelete("delete")]
    [Produces("application/json")]
    public IActionResult Delete(int idAccount,int idChairCar)
    {
        try
        {
            return Ok(new
            {
                status = _invoiceDetailCarService.Delete(idAccount, idChairCar)
            });
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("getPriceInvoiceDetails/{idInvoice}/{idChairCar}/{dateBook}")]
    [Produces("application/json")]
    public IActionResult GetPriceInvoiceDetails(int idInvoice,int idChairCar, string dateBook)
    {
        try
        {
            return Ok(_invoiceDetailCarService.GetPriceInvoiceDetails(idInvoice, idChairCar, dateBook));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("getDetailForCart/{idAccount}")]
    [Produces("application/json")]
    public IActionResult GetDetailForCart(int idAccount)
    {
        try
        {
            return Ok(_invoiceDetailCarService.GetDetailForCart(idAccount));
        }
        catch
        {
            return BadRequest();
        }
    }


}