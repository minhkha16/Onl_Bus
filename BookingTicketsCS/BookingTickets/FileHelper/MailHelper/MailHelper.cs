using System.Net.Mail;
using System.Net;

namespace BookingTickets.FileHelper.MailHelpers;

public class MailHelper
{
    private readonly IConfiguration _iconfiguration;
    public MailHelper(IConfiguration iconfiguration)
    {
        _iconfiguration = iconfiguration;
    }

    public bool Send(string from, string to, string subject, string body)
    {
        try
        {
            var host = _iconfiguration["Gmail:Host"];
            var port = int.Parse(_iconfiguration["Gmail:Port"]!);
            var username = _iconfiguration["Gmail:Username"];
            var password = _iconfiguration["Gmail:Password"];
            var enable = bool.Parse(_iconfiguration["Gmail:SMTP:starttls:enable"]!);
            var smtpClient = new SmtpClient
            {
                Host = host!,
                Port = port,
                EnableSsl = enable,
                Credentials = new NetworkCredential(username, password)
            };

            var mailMessage = new MailMessage(from, to);
            mailMessage.Subject = subject;
            mailMessage.Body = body;
            mailMessage.IsBodyHtml = true;
            smtpClient.Send(mailMessage);
            return true;
        }
        catch (Exception ex) { }
        {
            return false;
        }
    }
}
