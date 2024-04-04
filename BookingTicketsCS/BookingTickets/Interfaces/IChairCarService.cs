using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface IChairCarService
{
    public dynamic GetAll();
    public bool Create(ChairCar chairCar);
    public bool Update(ChairCar chairCar);
    public bool Delete(int id);
    public dynamic GetById(int id);




    public dynamic GetByIdCharAndIdCarAndDateBook(int idChair, string idCar, string dateBook);
    public dynamic GetByIdCar(string idCar);
    public dynamic GetByIdCarAndIdTimeLineAndDateBook(string idCar, int idTimeLine, string dateBook);
    public int? CountTheChairAvailable(string idCar, int idTimeLine, string dateBook);
    public dynamic GetIdChairCar(int idChair, string idCar, int idTimeLine);
    public dynamic CheckSubject(int idChair, string idCar, int idTimeLine);

}
