using BookingTickets.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookingTickets.Interfaces;

public interface IInvoiceDetailCarService
{
    public dynamic Add(InvoiceDetailCar invoiceDetailCar);
    public dynamic GetPriceInvoiceDetails(int idInvoice, int idChairCar, string dateBook);
    public dynamic GetDetailForCart(int idAccount);
    public dynamic Delete(int idAccount, int idChairCar);



}