using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface IWorkSchedulesService
{
    public bool Add(WorkSchedule ws);
    public dynamic GetById(int id);
    public bool Update(WorkSchedule ws);
    public bool Delete(int id);
    public dynamic GetByIdAccount(int idAccount);
    public dynamic GetByIdAccount2(int idAccount, string status);
    public dynamic GetByIdWorkDay(DateTime workday);
    public bool CheckWork(string idcar, int? idacount, string date, int? idtime);
    public dynamic findAll();
    public dynamic findCar(string car);




    public dynamic GetIdCar(int idAccount);
    public dynamic GetByStatusCompleted(int idAccount, string status);
    public dynamic Search(int freeway, int time, string date);

    public dynamic GetByIdAccountAndStatusAndDateBook(int idAccount, string status, string dateBook);

}
