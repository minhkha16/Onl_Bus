using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.Admin.Controllers;

[Area("admin")]
[Route("admin/api/homepage")]
public class HomePageController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}
