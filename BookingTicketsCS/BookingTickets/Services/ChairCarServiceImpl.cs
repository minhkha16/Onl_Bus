using BookingTickets.Interfaces;
using BookingTickets.Models;
using System.Globalization;

namespace BookingTickets.Services;

public class ChairCarServiceImpl : IChairCarService
{
    private readonly DatabaseContext _databaseContext;

    public ChairCarServiceImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public bool Create(ChairCar chairCar)
    {
        try
        {
            var c = check(chairCar.IdCar);
            for (var a = 1; a <= c; a++)
               {
                chairCar.Status = true;
                chairCar.IdChair = a;
                chairCar.Id = 0;
                _databaseContext.ChairCars.Add(chairCar);
                _databaseContext.SaveChanges();
                }
            return true;
        }
        catch
        {
            return false;
        }
    }
    public int check(string idcar)
    {
        var a = _databaseContext.CategoryCars.Where(c => c.Id == _databaseContext.Cars.Where(b => b.LicensePlates.Equals(idcar)).SingleOrDefault().IdCategory).SingleOrDefault().Name;
        return a!= null ? int.Parse(a) : 0;
    }
    public bool Delete(int id)
    {
        try
        {
            if(_databaseContext.InvoiceDetailCars.Where(a=>a.IdChairCar == id) != null)
            {
                _databaseContext.ChairCars.Remove(_databaseContext.ChairCars.FirstOrDefault(a => a.Id == id)!);
                return _databaseContext.SaveChanges() > 0;
            }
           return false;
        }
        catch
        {
            return false;
        }
    }

    public dynamic GetAll()
    {
        try
        {
            return _databaseContext.ChairCars.Select(c => new
            {
                Id = c.Id,
                Status = c.Status,
                IdChair = c.IdChair,
                IdAccount = c.IdAccount,
                IdCar = c.IdCar,
                NameCar = c.IdCarNavigation.LicensePlates,
                Line = c.IdTimeLineNavigation.Line,
                CreateAt = c.CreateAt,
                UpdateAt = c.UpdateAt
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
            return _databaseContext.ChairCars.Where(c => c.Id == id).Select(c => new
            {
                Id = c.Id,
                Status = c.Status,
                IdChair = c.IdChair,
                IdAccount = c.IdAccount,
                IdCar = c.IdCar,
                IdTimeLine = c.IdTimeLine,
                DateBook = c.DateBook,
                CreateAt = c.CreateAt,
                UpdateAt = c.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public bool Update(ChairCar chairCar)
    {
        try
        {
            _databaseContext.ChairCars.Entry(chairCar).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
             _databaseContext.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }
    public dynamic GetByIdCarAndIdTimeLineAndDateBook(string idCar, int idTimeLine, string dateBook)
    {
        try
        {
            var a = DateTime.ParseExact(dateBook, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            return _databaseContext.ChairCars.Where(c => c.IdCar == idCar && c.IdTimeLine == idTimeLine && a == c.DateBook).Select(c => new
            {
                Id = c.Id,
                Status = c.Status,
                IdChair = c.IdChair,
                IdAccount = c.IdAccount,
                IdCar = c.IdCar,
              
                CreateAt = c.CreateAt,
                UpdateAt = c.UpdateAt
            }).ToList();
        }
        catch
        {
            return null!;
        }
    }
    public dynamic GetByIdCharAndIdCarAndDateBook(int idChair, string idCar, string dateBook)
    {
        try
        {
            var date = DateTime.ParseExact(dateBook, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            return _databaseContext.ChairCars.Where(c => c.IdChair == idChair && c.IdCar == idCar && c.DateBook == date).Select(c => new
            {
                Id = c.Id,
                Status = c.Status,
                IdChair = c.IdChair,
                IdAccount = c.IdAccount,
                IdCar = c.IdCar,
                IdTimeLine = c.IdTimeLine,
                DateBook = c.DateBook,
                CreateAt = c.CreateAt,
                UpdateAt = c.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }
    public int? CountTheChairAvailable(string idCar, int idTimeLine, string dateBook)
    {
        try
        {
            var date = DateTime.ParseExact(dateBook, "dd-MM-yyyy", CultureInfo.InvariantCulture);

            return _databaseContext.ChairCars.Count(c => c.IdCar == idCar && c.IdTimeLine == idTimeLine && c.DateBook == date && c.Status == true);
        }
        catch
        {
            return null;
        }
    }

    public dynamic GetByIdCar(string idCar)
    {
        try
        {
            return _databaseContext.ChairCars.Where(c => c.IdCar == idCar).Select(c => new
            {
                Id = c.Id,
                Status = c.Status,
                IdChair = c.IdChair,
                IdAccount = c.IdAccount,
                IdCar = c.IdCar,
                DateBook = c.DateBook,
                CreateAt = c.CreateAt,
                UpdateAt = c.UpdateAt
            }).ToList();
        }
        catch
        {
            return null!;
        }
    }
    public dynamic GetIdChairCar(int idChair, string idCar, int idTimeLine)
    {
        return _databaseContext.ChairCars.Where(p => p.IdChair == idChair && p.IdCar == idCar && p.IdTimeLine == idTimeLine).FirstOrDefault().Id;
    }

    public dynamic CheckSubject(int idChair, string idCar, int idTimeLine)
    {
        return _databaseContext.ChairCars.Where(p => p.IdChair == idChair && p.IdCar == idCar && p.IdTimeLine == idTimeLine).FirstOrDefault().SubjectChair;
    }
}
