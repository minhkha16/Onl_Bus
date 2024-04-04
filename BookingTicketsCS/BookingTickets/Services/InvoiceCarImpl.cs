using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingTickets.Services;

public class InvoiceCarImpl : IInvoiceCarService
{
    private readonly DatabaseContext _databaseContext;

    public InvoiceCarImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public bool Add(InvoiceCar invoiceCar)
    {
        try
        {
            _databaseContext.InvoiceCars.Add(invoiceCar);
            _databaseContext.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public dynamic CheckInvoice(int idAccount)
    {
        try
        {
            if (_databaseContext.InvoiceCars.Where(p => p.IdAccount == idAccount && p.Status == "ready").ToList().Count > 0)
            {
                return 1;
            }
            else
            {
                return 0;
            }
        }
        catch
        {
            return false;
        }
    }

    public dynamic Complete(int idAccount)
    {
        try
        {
            return _databaseContext.InvoiceCars.Where(i => i.IdAccount == idAccount && i.Status == "Completed").Select(i => new
            {
                Id = i.Id,
                Date = i.Date,
                Note = i.Note,
                Total = i.Total,
                IdAccount = i.IdAccount,
                Status = i.Status,
                CreateAt = i.CreateAt,
                UpdateAt = i.UpdateAt,
                FullName = i.IdAccountNavigation.FullName
            }).OrderByDescending(i => i.Id).ToList()!;
        }
        catch
        {
            return null!;
        }
    }

    public bool Delete(int id)
    {
        try
        {
            _databaseContext.InvoiceCars.Remove(_databaseContext.InvoiceCars.FirstOrDefault(a => a.Id == id)!);
             _databaseContext.SaveChanges();
            return true;

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
            return _databaseContext.InvoiceCars.Select(a => new
            {
                Id = a.Id,
                Date = a.Date,
                Note = a.Note,
                Total = a.Total,
                IdAccount = a.IdAccount,
                CreateAt = a.CreateAt,
                UpdateAt = a.UpdateAt,
            }).ToList()!;
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
            return _databaseContext.InvoiceCars.AsNoTracking().Where(a => a.Id == id && a.Status == "ready").Select(a => new
            {
                Id = a.Id,
                Date = a.Date,
                Note = a.Note,
                Total = a.Total,
                Status = a.Status,
                IdAccount = a.IdAccount,
                CreateAt = a.CreateAt,
                UpdateAt = a.UpdateAt,
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
            return _databaseContext.InvoiceCars.Where(i => i.IdAccount == idAccount && i.Status == "ready").Select(i => new
            {
                Id = i.Id,
                Date = i.Date,
                Note = i.Note,
                Total = i.Total,
                IdAccount = i.IdAccount,
                Status = i.Status,
                CreateAt = i.CreateAt,
                UpdateAt = i.UpdateAt,
            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetByIdAccountCar(int idAccount)
    {
        try
        {
            return _databaseContext.InvoiceCars.Where(i => i.IdAccount == idAccount && i.Status =="ready").Select(i => new
            {
                Id = i.Id,
                Date = i.Date,
                Note = i.Note,
                Total = i.Total,
                IdAccount = i.IdAccount,
                Status = i.Status,
                CreateAt = i.CreateAt,
                UpdateAt = i.UpdateAt,
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetIdInvoice(int idAccount)
    {
        try
        {
            return _databaseContext.InvoiceCars.Where(p => p.IdAccount == idAccount && p.Status == "ready").FirstOrDefault().Id;

        }
        catch
        {
            return false;
        }
    }

    public dynamic GetPriceforInvoice(int id_car, string datebook)
    {
        throw new NotImplementedException();
    }

    public dynamic GetTotalPrice(int idAccount)
    {
        try
        {
            return _databaseContext.InvoiceCars.Where(p => p.IdAccount == idAccount && p.Status == "ready").FirstOrDefault().Total;

        }
        catch
        {
            return false;
        }
    }

    public dynamic InProgess(int idAccount)
    {
        try
        {
            return _databaseContext.InvoiceCars.Where(i => i.IdAccount == idAccount && i.Status == "InProgess").Select(i => new
            {
                Id = i.Id,
                Date = i.Date,
                Note = i.Note,
                Total = i.Total,
                IdAccount = i.IdAccount,
                Status = i.Status,
                CreateAt = i.CreateAt,
                UpdateAt = i.UpdateAt,
                FullName = i.IdAccountNavigation.FullName,
                //WorkDay = _databaseContext.WorkSchedules.Where(i => i.IdAccount == idAccount && i.IdCar == 1).Select(i => new
                //{
                //    Id = i.Id,
                //    Line = i.IdTimeLineNavigation.Line
                //}).FirstOrDefault()!
            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }

    public bool Update(InvoiceCar invoiceCar)
    {
        try
        {
            _databaseContext.InvoiceCars.Entry(invoiceCar).State = EntityState.Modified;
            _databaseContext.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }

    public dynamic GetByIdAccountAndStatus(int idAccount, string status)
    {
        try
        {
            return _databaseContext.InvoiceCars.Where(i => i.IdAccount == idAccount && i.Status == status).Select(i => new
            {
                Id = i.Id,
                Date = i.Date,
                Note = i.Note,
                Status = i.Status,
                Total = i.Total,
            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic CheckChairAdmin()
    {
        try
        {
            return _databaseContext.InvoiceDetailCars.Select(
                i => new
                {
                   Date = i.IdIvoiceCarNavigation.Date,
                   NameAcount = i.IdIvoiceCarNavigation.IdAccountNavigation.FullName,
                   Chairs = i.IdChairCarNavigation.IdChair,
                   Time = i.IdChairCarNavigation.IdTimeLineNavigation.Line,
                   Cars = i.IdChairCarNavigation.IdCarNavigation.LicensePlates,
                   Level =i.IdIvoiceCarNavigation.IdAccountNavigation.Level
                });
        }
        catch (Exception)
        {

            return null;
        }
    }
}
