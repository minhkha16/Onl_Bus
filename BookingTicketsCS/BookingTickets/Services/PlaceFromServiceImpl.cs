using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingTickets.Services;

public class PlaceFromServiceImpl : IPlaceFromService
{
    private readonly DatabaseContext _databaseContext;

    public PlaceFromServiceImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public bool Add(PlaceFrom a)
    {
        try
        {
           
                _databaseContext.PlaceFroms.Add(a);
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
            if (_databaseContext.Freeways.Where(c => c.IdFrom == id) != null)
            {
                _databaseContext.PlaceFroms.Remove(_databaseContext.PlaceFroms.FirstOrDefault(acc => acc.Id == id)!);
                return _databaseContext.SaveChanges() > 0;
            }
               return false;
        }
        catch
        {
            return false;
        }
    }

    public dynamic FineAll()
    {
        try
        {
            return _databaseContext.PlaceFroms.AsNoTracking().Select(acc => new
            {
                Id = acc.Id,
                Name=acc.Name
            }).ToList();
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
            return _databaseContext.PlaceFroms.AsNoTracking().Where(acc => acc.Id == id)!.Select(acc => new
            {
                Id = acc.Id,
                Name = acc.Name
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public bool Update(PlaceFrom a)
    {
        try
        {
            _databaseContext.PlaceFroms.Entry(a).State = EntityState.Modified;
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }
}
