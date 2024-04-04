using BookingTickets.FileHelper.MailHelpers;
using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Areas.Admin.Controllers;
[Area("admin")]
[Route("admin/api/account")]
public class AccountController : Controller
{
    //private IAccountServive accountServive;

    //public AccountController(IAccountServive accountServive)
    //{
    //    this.accountServive = accountServive;
    //}

    [HttpPost("add")]
    [Consumes("application/json")]
    public IActionResult Add([FromBody] Account a)
    {
        try
        {
            return Ok(_IAccountService.Add(a));
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpPost("login")]
    [Consumes("application/json")]
    public IActionResult Login([FromBody] Account a)
    {
        try
        {
            return Ok(_IAccountService.Login(a.Email, a.Password));
        }
        catch
        {
            return BadRequest();
        }
    }
    //[HttpDelete("delete")]
    //[Consumes("application/json")]
    //public IActionResult DeleteCar(int id)
    //{
    //    try
    //    {
    //        return Ok(accountServive.Delete(id));
    //    }
    //    catch
    //    {
    //        return BadRequest();
    //    }
    //}
    [HttpPut("edit")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult EditTimeLine([FromBody] Account a)
    {
        try
        {
            return Ok(_IAccountService.Update(a));
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
            return Ok(_IAccountService.FindAll());
        }
        catch
        {
            return BadRequest();
        }
    }
    [HttpGet("finddrive")]
    [Consumes("application/json")]
    [Produces("application/json")]
    public IActionResult FindAllDrive()
    {
        try
        {
            return Ok(_IAccountService.FindAllDrive());
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
            return Ok(_IAccountService.GetById(id));
        }
        catch
        {
            return BadRequest();
        }
    }

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

    //[HttpPost("creation")]
    //[Consumes("application/json")]
    //public IActionResult Creation([FromBody] Account account)
    //{
    //    try
    //    {
    //        var mail = new MailHelper(_IConfiguration);

    //        mail.Send(_IConfiguration["Gmail:Username"]!, account.Email!, $"Verify for your account. Account Name is {account.Email}", account.SecurityCode!);

    //        return Ok(_IAccountService.Add(account));
    //    }
    //    catch
    //    {
    //        return BadRequest();
    //    }
    //}

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

    [HttpGet("sendWithoutEmail/{email}/{subEmail}")]
    [Produces("application/json")]
    public IActionResult SendWithoutEmail(string email, string subEmail)
    {
        try
        {
            var getByEmail = _IAccountService.CheckByEmail(email);

            var mail = new MailHelper(_IConfiguration);

            mail.Send(_IConfiguration["Gmail:Username"]!, subEmail, $"Verify for your account. Account Name is {email}", getByEmail.SecurityCode!);

            return Ok(true);
        }
        catch
        {
            return BadRequest();
        }
    }

    [HttpGet("sendMailToForgotPassword/{email}")]
    [Produces("application/json")]
    public IActionResult SendMailToForgotPassword(string email)
    {
        try
        {
            Account getByEmail = _IAccountService.CheckByEmail(email);

            var mail = new MailHelper(_IConfiguration);

            mail.Send(_IConfiguration["Gmail:Username"]!, email, $"Verify for your account. Account Name is {email}", getByEmail.SecurityCode!);

            return Ok(true);
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

    //[HttpGet("login/{email}/{password}")]
    //[Produces("application/json")]
    //public IActionResult Login(string email, string password)
    //{
    //    try
    //    {
    //        return Ok(_IAccountService.Login(email, password));
    //    }
    //    catch
    //    {
    //        return BadRequest();
    //    }
    //}

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
}
