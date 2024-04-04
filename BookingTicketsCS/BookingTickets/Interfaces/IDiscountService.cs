using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface IDiscountService
{
    public bool Add(Discount dis);
    public dynamic GetById(int id);
    public bool Update(Discount dis);
    public bool Delete(int id);
    public dynamic GetAllDiscount();
    public dynamic GetByCode(int idAccount, string code);
}
