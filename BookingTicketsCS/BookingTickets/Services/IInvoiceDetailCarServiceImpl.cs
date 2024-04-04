using BookingTickets.Interfaces;
using BookingTickets.Models;
using System.Globalization;

namespace BookingTickets.Services;

public class InvoiceDetailCarServiceImpl : IInvoiceDetailCarService
{
    private readonly DatabaseContext _databaseContext;

    public InvoiceDetailCarServiceImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }
    public dynamic Add(InvoiceDetailCar invoiceDetailCar)
    {
        try
        {
            _databaseContext.InvoiceDetailCars.Add(invoiceDetailCar);
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }
    public dynamic Delete(int idAccount, int idChairCar)
    {
        try
        {

            _databaseContext.InvoiceDetailCars.Remove(_databaseContext.InvoiceDetailCars.FirstOrDefault(p => p.IdIvoiceCar == _databaseContext.InvoiceCars.FirstOrDefault(inv => inv.IdAccount == idAccount && inv.Status == "ready").Id && p.IdChairCar == idChairCar)!);
             _databaseContext.SaveChanges();
            return true;
        }
        catch
        {
            return false;
        }
    }
    public dynamic GetPriceInvoiceDetails(int idInvoice, int idChairCar, string dateBook)
    {
        try
        {
            return _databaseContext.InvoiceDetailCars.Where(i => i.IdIvoiceCar == idInvoice && i.IdChairCar == idChairCar).Select(i => new
            {

                Price = _databaseContext.Freeways.FirstOrDefault(a => a.Id == _databaseContext.WorkSchedules.FirstOrDefault(w => w.WorkDay == DateTime.ParseExact(dateBook, "dd-MM-yyyy", CultureInfo.InvariantCulture) && w.IdCar == _databaseContext.ChairCars.FirstOrDefault(p => i.IdChairCar == p.Id)!.IdCar && w.IdTimeLine == _databaseContext.ChairCars.FirstOrDefault(p => i.IdChairCar == p.Id)!.IdTimeLine)!.IdFreeway)!.Price,

            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }
    public dynamic GetDetailForCart(int idAccount)
    {
        try
        {
            var idInvoice = _databaseContext.InvoiceCars.Where(a => a.IdAccount == idAccount && a.Status == "ready").FirstOrDefault().Id;
            return _databaseContext.InvoiceDetailCars.Where(i => i.IdIvoiceCar == idInvoice).Select(i => new
            {
                idchaircar = i.IdChairCar,

                placefrom = _databaseContext.Freeways.FirstOrDefault(f => f.Id == _databaseContext.WorkSchedules.Where(w => w.WorkDay == _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().DateBook && w.IdTimeLine == _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().IdTimeLine && w.IdCar == _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().IdCar).FirstOrDefault().IdFreeway).IdFromNavigation.Name,

                placeto = _databaseContext.Freeways.FirstOrDefault(f => f.Id == _databaseContext.WorkSchedules.Where(w => w.WorkDay == _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().DateBook && w.IdTimeLine == _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().IdTimeLine && w.IdCar == _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().IdCar).FirstOrDefault().IdFreeway).IdToNavigation.Name,

                price = _databaseContext.Freeways.FirstOrDefault(f => f.Id == _databaseContext.WorkSchedules.Where(w => w.WorkDay == _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().DateBook && w.IdTimeLine == _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().IdTimeLine && w.IdCar == _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().IdCar).FirstOrDefault().IdFreeway).Price,

                namechair = "ghe" + i.IdChairCarNavigation.IdChair,

                namecar = _databaseContext.Cars.FirstOrDefault(nc => nc.LicensePlates == _databaseContext.ChairCars.FirstOrDefault(c => c.Id == i.IdChairCar).IdCar).NameCar,

                catecar = _databaseContext.Cars.FirstOrDefault(car => car.LicensePlates == _databaseContext.ChairCars.FirstOrDefault(c => c.Id == i.IdChairCar).IdCar).IdCategoryNavigation.Name,

                subject = _databaseContext.ChairCars.FirstOrDefault(sbj => sbj.Id == i.IdChairCar).SubjectChair,

                datebook = _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().DateBook,

                line = _databaseContext.ChairCars.Where(c => c.Id == i.IdChairCar).FirstOrDefault().IdTimeLineNavigation.Line,


            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }
}
