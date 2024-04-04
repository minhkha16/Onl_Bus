using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore.Storage;
using System.Globalization;

namespace BookingTickets.Services;

public class WorkSchedulesServiceImpl : IWorkSchedulesService
{
    private readonly DatabaseContext _databaseContext;
    private readonly IChairCarService _chairCarService;

    public WorkSchedulesServiceImpl(DatabaseContext databaseContext, IChairCarService chairCarService)
    {
        _databaseContext = databaseContext;
        _chairCarService = chairCarService;
    }

    public bool Add(WorkSchedule ws)
    {
        try
        {
            ws.Status = "InProgress";
                _databaseContext.WorkSchedules.Add(ws);
            _databaseContext.SaveChanges();
            ChairCar a = new ChairCar();
            a.IdCar = ws.IdCar;
            a.IdTimeLine = ws.IdTimeLine;
            a.DateBook = ws.WorkDay;
            _chairCarService.Create(a);
            return true;
        }
        catch
        {
            return false;
        }
    }

    public bool CheckWork(string idcar, int? idacount, string date , int? idtime)
    {
        var day = DateTime.ParseExact(date, "dd/MM/yyyy", CultureInfo.InvariantCulture);
        if (_databaseContext.WorkSchedules.Where(ws => ws.IdCar.Equals(idcar) && ws.IdAccount == idacount && ws.WorkDay == day && ws.IdTimeLine == idtime).Count() > 0)
        {
            return false;
        }
        return true;
    }

    public bool Delete(int id)
    {
        try
        {
            _databaseContext.WorkSchedules.Remove(_databaseContext.WorkSchedules.FirstOrDefault(ws => ws.Id == id)!);
            return _databaseContext?.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public dynamic findAll()
    {
        try
        {
            return _databaseContext.WorkSchedules.Select(w => new
            {
                Id = w.Id,
                WorkDay = w.WorkDay,
                IdTimeLine = w.IdTimeLine,
                Line = w.IdTimeLineNavigation.Line,
                IdFreeway = w.IdFreeway,
                Namefreeway = w.IdFreewayNavigation.Name,
                IdAccount = w.IdAccount,
                Nameaccount = w.IdAccountNavigation.FullName,
                IdCar = w.IdCar,
                NameCar = w.IdCarNavigation.LicensePlates,
                CreateAt = w.CreateAt,
                UpdateAt = w.UpdateAt
            });
        }
        catch
        {
            return null!;
        }
    }
    public dynamic findCar(string car)
    {
        try
        {
            return _databaseContext.WorkSchedules.Where(a=>a.IdCar == car).Select(w => new
            {
                IdTimeLine = w.IdTimeLine,
                Line = w.IdTimeLineNavigation.Line +" - " + w.WorkDay,
            });
        }
        catch
        {
            return null!;
        }
    }
    public dynamic GetById(int id)
    {
        try
        {
            return _databaseContext.WorkSchedules.Where(w => w.Id == id).Select(w => new
            {
                Id = w.Id,
                WorkDay = w.WorkDay,
                IdTimeLine = w.IdTimeLine,
                Line = w.IdTimeLineNavigation.Line,
                IdFreeway = w.IdFreeway,
                Namefreeway = w.IdFreewayNavigation.Name,
                IdAccount = w.IdAccount,
                Nameaccount = w.IdAccountNavigation.FullName,
                IdCar = w.IdCar,
                NameCar = w.IdCarNavigation.LicensePlates,
                Status = w.Status,
                CreateAt = w.CreateAt,
                UpdateAt = w.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }


    public dynamic GetByIdAccount(int idAccount)
    {
        try
        {
            return _databaseContext.WorkSchedules.Where(w => w.IdAccount == idAccount).Select(w => new
            {
                Id = w.Id,
                WorkDay = w.WorkDay,
                IdTimeLine = w.IdTimeLine,
                Line = w.IdTimeLineNavigation.Line,
                IdFreeway = w.IdFreeway,
                Namefreeway = w.IdFreewayNavigation.Name,
                IdAccount = w.IdAccount,
                Nameaccount = w.IdAccountNavigation.FullName,
                IdCar = w.IdCar,
                NameCar = w.IdCarNavigation.LicensePlates,
                Status = w.Status,
                CreateAt = w.CreateAt,
                UpdateAt = w.UpdateAt
            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetByIdAccount2(int idAccount, string status)
    {
        try
        {
            return _databaseContext.WorkSchedules.Where(w => w.IdAccount == idAccount && w.Status == status).Select(w => new
            {
                Id = w.Id,
                WorkDay = w.WorkDay,
                TimeLine = w.IdTimeLineNavigation.Line,
                From = w.IdFreewayNavigation.IdFromNavigation.Name,
                To = w.IdFreewayNavigation.IdToNavigation.Name,
                DriverName = w.IdAccountNavigation.FullName,
                Status = w.Status
            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetByIdWorkDay(DateTime workday)
    {
        try
        {
            return _databaseContext.WorkSchedules.Where(w => w.WorkDay == workday).Select(w => new
            {
                Id = w.Id,
                WorkDay = w.WorkDay,
                IdTimeLine = w.IdTimeLine,
                Line = w.IdTimeLineNavigation.Line,
                IdFreeway = w.IdFreeway,
                Namefreeway = w.IdFreewayNavigation.Name,
                IdAccount = w.IdAccount,
                Nameaccount = w.IdAccountNavigation.FullName,
                IdCar = w.IdCar,
                NameCar = w.IdCarNavigation.LicensePlates,
                CreateAt = w.CreateAt,
                UpdateAt = w.UpdateAt
            }).ToList();
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetByStatusCompleted(int idAccount, string status)
    {
        try
        {
            return _databaseContext.WorkSchedules.Where(w => w.IdAccount == idAccount && w.Status == status).Select(w => new
            {
                Id = w.Id,
                WorkDay = w.WorkDay,
                TimeLine = w.IdTimeLineNavigation.Line,
                From = w.IdFreewayNavigation.IdFromNavigation.Name,
                To = w.IdFreewayNavigation.IdToNavigation.Name,
                DriverName = w.IdAccountNavigation.FullName,
                Status = w.Status,
                IdAccount = w.IdAccount,
                IdCar = w.IdCar
            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetByIdAccountAndStatusAndDateBook(int idAccount, string status, string dateBook)
    {
        try
        {
            return _databaseContext.WorkSchedules.Where(w => w.IdAccount == idAccount && w.Status == status && w.WorkDay == DateTime.ParseExact(dateBook, "dd-MM-yyyy", CultureInfo.InvariantCulture)).Select(w => new
            {
                Id = w.Id,
                WorkDay = w.WorkDay,
                TimeLine = w.IdTimeLineNavigation.Line,
                From = w.IdFreewayNavigation.IdFromNavigation.Name,
                To = w.IdFreewayNavigation.IdToNavigation.Name,
                DriverName = w.IdAccountNavigation.FullName,
                Status = w.Status,
                IdAccount = w.IdAccount,
                IdCar = w.IdCar,
                DateNow = DateTime.ParseExact(dateBook, "dd-MM-yyyy", CultureInfo.InvariantCulture)
            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetIdCar(int idAccount)
    {
        throw new NotImplementedException();
    }

    public dynamic Search(int freeway, int time, string date)
    {
        try
        {
            var a = DateTime.ParseExact(date, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            return _databaseContext.WorkSchedules.Where(w => w.WorkDay == a && w.IdTimeLine == time && w.IdFreeway == freeway).Select(w => new
            {
                WorkDay = w.WorkDay,
                TimeLine = w.IdTimeLineNavigation.Line,
                From = w.IdFreewayNavigation.IdFromNavigation.Name,
                To = w.IdFreewayNavigation.IdToNavigation.Name,
                IdAccount = w.IdAccount,
                IdCar = w.IdCar
            }).ToList()!;

        }
        catch { return null!; }
    }

    public bool Update(WorkSchedule ws)
    {
        try
        {
            _databaseContext.Update(ws);
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

}
