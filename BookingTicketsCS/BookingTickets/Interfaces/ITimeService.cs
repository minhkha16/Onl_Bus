using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface ITimeService
{
    public bool Add(TimeLine timeline);
    public dynamic GetByLine(string line);
    public bool Update(TimeLine timeline);
    public bool Delete(int id);
    public dynamic FineAll();
    public dynamic GetAll();
    public dynamic GetById(int id);
   
}
