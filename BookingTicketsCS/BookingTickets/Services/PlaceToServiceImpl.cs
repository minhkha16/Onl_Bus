using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingTickets.Services;

public class PlaceToServiceImpl : IPlaceToService
{
    private readonly DatabaseContext _databaseContext;

    public PlaceToServiceImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public bool Add(PlaceTo a)
    {
        try
        {
           
                _databaseContext.PlaceTos.Add(a);
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
            if(_databaseContext.Freeways.Where(c=>c.IdTo == id) != null)
            {
                _databaseContext.PlaceTos.Remove(_databaseContext.PlaceTos.FirstOrDefault(acc => acc.Id == id)!);
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
            return _databaseContext.PlaceTos.AsNoTracking().Select(acc => new
            {
                Id = acc.Id,
                Name = acc.Name,
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
            return _databaseContext.PlaceTos.AsNoTracking().Where(acc => acc.Id == id)!.Select(acc => new
            {
                Id = acc.Id,
                Name=acc.Name,
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public bool Update(PlaceTo a)
    {
        try
        {
            _databaseContext.PlaceTos.Entry(a).State = EntityState.Modified;
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }
}
