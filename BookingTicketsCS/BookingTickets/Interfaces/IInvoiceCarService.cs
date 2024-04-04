using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface IInvoiceCarService
{
    public bool Add(InvoiceCar invoiceCar);
    public bool Update(InvoiceCar invoiceCar);
    public bool Delete(int id);
    public dynamic GetById(int id);
    public dynamic GetAll();
    public dynamic GetByIdAccountAndStatus(int idAccount, string status);
    public dynamic GetByIdAccount(int idAccount);
    public dynamic InProgess(int idAccount);
    public dynamic Complete(int idAccount);
    public dynamic CheckInvoice(int idAccount);
    public dynamic GetIdInvoice(int idAccount);
    public dynamic GetPriceforInvoice(int id_car, string datebook);
    public dynamic GetTotalPrice(int idAccount);

    public dynamic GetByIdAccountCar(int idAccount);
    public dynamic CheckChairAdmin();
}
