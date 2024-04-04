
using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface IFreewayService
{
    public bool Add (Freeway freeway);
    public bool Update(Freeway freeway);
    public bool Delete(int id);
    public dynamic GetById(int id);
    public dynamic FindAll();
    public dynamic FindByDate(DateTime to, DateTime from);





    public dynamic GetAll();   
    public dynamic GetAllPlaceFrom();
    public dynamic GetAllFreeway();
    public dynamic GetPlaceTo(int id_placefrom);
    public dynamic getPlaceToById(int id_placefrom);
    public dynamic CheckFreeWay(int id_placefrom, int id_placeto, string departing);
    public dynamic GetPopularFreewaybyIdPlacefrom(int id_placefrom);
}
