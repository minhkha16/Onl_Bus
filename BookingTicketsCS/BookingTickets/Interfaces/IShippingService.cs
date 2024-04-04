using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface IShippingService
{
    public bool Add(Shipping shipping);
    public dynamic GetById(int id);
    public bool Update(Shipping shipping);
    public bool Delete(int id);
    public dynamic GetAllShipping();
    public dynamic GetAll();

    public dynamic GetByIdp(string pakage);

    public dynamic GetByIdButPrice(int id);
}
