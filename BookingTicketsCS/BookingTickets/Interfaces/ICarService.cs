using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface ICarService
{
    public bool Add(Car car);
    public bool Update(Car bus);
    public dynamic GetById(string id);
    public dynamic GetAllCar();
    public dynamic GetByCate(int idcate);
    public dynamic GetByWord(string idcar);




    public bool Delete(string LicensePlates);
    public dynamic GetByLicensePlates(string LicensePlates);
    public dynamic GetAllCar(int id_time, int id_freeway, string departing);
    public dynamic SearchCarByCate(int id_time, int id_freeway, int id_cate, string departing);
}
