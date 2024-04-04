using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface IPlaceFromService
{
    public bool Add(PlaceFrom a);
    public bool Update(PlaceFrom a);
    public bool Delete(int id);
    public dynamic FineAll();
    public dynamic GetById(int id);
}
