using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface IinvoiceShippingService
{
    public bool Add(InvoiceShipping invoice);
    public dynamic GetById(int id);
    public bool Update(InvoiceShipping invoice);
    public bool Delete(int id);
    public dynamic GetAllInvoice();

    public dynamic GetByTotal(int id);
    public dynamic GetByIdInvoiceShipping(int id);
    public bool UpdateStatus(InvoiceShipping invoice);
}
