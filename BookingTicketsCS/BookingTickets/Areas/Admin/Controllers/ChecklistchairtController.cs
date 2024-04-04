using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/listchair")]
public class ChecklistchairtController : Controller
{
    private IInvoiceCarService invoiceCarService;

    public ChecklistchairtController(IInvoiceCarService invoiceCarService)
    {
        this.invoiceCarService = invoiceCarService;
    }

    [HttpGet("list")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult List()
    {
        try
        {
            return Ok(invoiceCarService.CheckChairAdmin());
        }
        catch
        {
            return BadRequest();
        }
    }
}
