using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace BookingTickets.Services;

public class FreewayServiceImpl : IFreewayService
{
    private readonly DatabaseContext _databaseContext;

    public FreewayServiceImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public bool Add(Freeway freeway)
    {
        try
        {
            freeway.Name = _databaseContext.PlaceFroms.Where(f => f.Id == freeway.IdFrom).FirstOrDefault().Name +"-"+ _databaseContext.PlaceTos.Where(f => f.Id == freeway.IdTo).FirstOrDefault().Name;
            _databaseContext.Freeways.Add(freeway);
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public bool Delete(int id)
    {
        try
        {
            _databaseContext.Freeways.Remove(_databaseContext.Freeways.FirstOrDefault(acc => acc.Id == id)!);
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public dynamic FindAll()
    {
        try
        {
            return _databaseContext.Freeways.AsNoTracking().Select(acc => new
            {
                Id = acc.Id,
                Name = acc.Name,
                IdFrom = acc.IdFrom,
                IdTo = acc.IdTo,
                Price= acc.Price,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            });
        }
        catch
        {
            return null!;
        }
    }

    public dynamic FindByDate(DateTime to, DateTime from)
    {
        try
        {
            return _databaseContext.Freeways.AsNoTracking().Where(acc => acc.CreateAt >= to && acc.CreateAt <= from)!.Select(acc => new
            {
                Id = acc.Id,
                IdFrom = acc.IdFrom,
                IdTo = acc.IdTo,
                Name = acc.Name,
                Price = acc.Price,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
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
            return _databaseContext.Freeways.AsNoTracking().Where(acc => acc.Id == id)!.Select(acc => new
            {
                Name = acc.Name,
                IdFrom = acc.IdFrom,
                Price = acc.Price,
                IdTo = acc.IdTo,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public bool Update(Freeway freeway)
    {
        try
        {
            _databaseContext.Freeways.Entry(freeway).State = EntityState.Modified;
            return _databaseContext.SaveChanges() > 0;
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
            return _databaseContext.Freeways.AsNoTracking().Select(acc => new
            {
                Id = acc.Id,
                From = acc.IdFromNavigation.Name,
                To = acc.IdToNavigation.Name,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }
    public dynamic GetAllPlaceFrom()
    {
        try
        {
            return _databaseContext.PlaceFroms.Select(acc => new
            {
                id = acc.Id,
                name = acc.Name,
            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }
    public dynamic GetAllFreeway()
    {
        var a = DateTime.ParseExact(DateTime.Now.ToString("dd-MM-yyyy"), "dd-MM-yyyy", CultureInfo.InvariantCulture);
        return _databaseContext.WorkSchedules.AsNoTracking().Where(p => p.WorkDay == a).Select(acc => new
        {
            id = acc.IdFreewayNavigation.Id,
            placefrom = acc.IdFreewayNavigation.IdFromNavigation.Name,
            placeto = acc.IdFreewayNavigation.IdToNavigation.Name,
            date = a,
        }).ToList()!;
    }
    public dynamic GetPlaceTo(int id_placefrom)
    {
        try
        {
            return _databaseContext.Freeways.Where(p => p.IdFrom == id_placefrom).Select(p => new
            {
                idPlaceTo = p.IdToNavigation.Id,
                name = p.IdToNavigation.Name,
            }).ToList()!;
        }
        catch
        {
            return null!;
        }
    }
    public dynamic CheckFreeWay(int id_placefrom, int id_placeto, string departing)
    {
        try
        {
            return _databaseContext.WorkSchedules.Where(p => p.IdFreewayNavigation.IdFrom == id_placefrom && p.IdFreewayNavigation.IdTo == id_placeto && DateTime.ParseExact(departing, "dd-MM-yyyy", CultureInfo.InvariantCulture) == p.WorkDay).Select(acc => new
            {

                id = acc.IdFreewayNavigation.Id,
                placefrom = acc.IdFreewayNavigation.IdFromNavigation.Name,
                placeto = acc.IdFreewayNavigation.IdToNavigation.Name,
                date = DateTime.ParseExact(departing, "dd-MM-yyyy", CultureInfo.InvariantCulture),
            });
        }
        catch
        {
            return null!;
        }
    }
    public dynamic GetPopularFreewaybyIdPlacefrom(int id_placefrom)
    {
        var a = DateTime.ParseExact(DateTime.Now.ToString("dd-MM-yyyy"), "dd-MM-yyyy", CultureInfo.InvariantCulture);
        return _databaseContext.WorkSchedules.AsNoTracking().Where(p => p.WorkDay == a && p.IdFreewayNavigation.IdFrom == id_placefrom).Select(acc => new
        {
            id = acc.IdFreewayNavigation.Id,
            placefrom = acc.IdFreewayNavigation.IdFromNavigation.Name,
            placeto = acc.IdFreewayNavigation.IdToNavigation.Name,
            date = a,
        }).ToList()!;
    }

    public dynamic getPlaceToById(int id_placefrom)
    {
        throw new NotImplementedException();
    }
}
