using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface IPlaceToService
{
    public bool Add(PlaceTo a);
    public bool Update(PlaceTo a);
    public bool Delete(int id);
    public dynamic FineAll();
    public dynamic GetById(int id);
}
