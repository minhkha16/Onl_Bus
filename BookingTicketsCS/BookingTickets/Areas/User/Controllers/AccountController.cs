using BookingTickets.FileHelper.MailHelpers;
using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.User.Controllers;
[Area("user")]
[Route("user/api/account")]
public class AccountController : Controller
{

    private readonly IAccountServive _IAccountService;

    private readonly IConfiguration _IConfiguration;

    public AccountController(IAccountServive iAccountService, IConfiguration iConfiguration)
    {
        _IAccountService = iAccountService;
        _IConfiguration = iConfiguration;
    }

    [HttpGet("getAll")]
    [Produces("application/json")]
    public IActionResult Index()
    {
        try
        {
            return Ok(_IAccountService.GetAll());
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpPost("creation")]
    [Consumes("application/json")]
    public IActionResult Creation([FromBody] Account account)
    {
        try
        {
            var mail = new MailHelper(_IConfiguration);

            mail.Send(_IConfiguration["Gmail:Username"]!,account.Email!,$"Verify for your account. Account Name is {account.Email}",account.SecurityCode!);

            return Ok(_IAccountService.Add(account));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("checkExists/{email}")]
    [Produces("application/json")]
    public IActionResult CheckExists(string email)
    {
        try
        {
            return Ok(_IAccountService.CheckEmailExists(email));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("login/{email}/{password}")]
    [Produces("application/json")]
    public IActionResult Login(string email, string password)
    {
        try
        {
            return Ok(_IAccountService.Login(email,password));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("getByEmail/{email}")]
    [Produces("application/json")]
    public IActionResult GetByEmail(string email)
    {
        try
        {
            return Ok(_IAccountService.GetByEmail(email));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpPost("update")]
    [Produces("application/json")]
    public IActionResult Update([FromBody] Account account)
    {
        try
        {
            if (string.IsNullOrEmpty(account.Password))
            {
                account.Password =  _IAccountService.GetById2(account.Id).Password;
            }
            else
            {
                account.Password = BCrypt.Net.BCrypt.HashPassword(account.Password);
            }

            return Ok(_IAccountService.Update(account));
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("changePasswordWithCurrentPassword/{email}/{currentPassword}")]
    [Produces("application/json")]
    public IActionResult ChangePasswordWithCurrentPassword(string email, string currentPassword)
    {
        try
        {
            Account getByEmail = _IAccountService.CheckByEmail(email);

            if (BCrypt.Net.BCrypt.Verify(currentPassword, getByEmail.Password))
            {

                return Ok(_IAccountService.Update(getByEmail));
            }

            return Ok(false);

        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("checkStatus/{email}")]
    [Produces("application/json")]
    public IActionResult CheckExists2(string email)
    {
        try
        {
            return Ok(_IAccountService.CheckStatus(email));
        }
        catch
        {
            return BadRequest();
        }
    }
}
