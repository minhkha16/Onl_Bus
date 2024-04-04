using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingTickets.Services;

public class ShippingServiceImpl : IShippingService
{
    private readonly DatabaseContext _databaseContext;

    public ShippingServiceImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public bool Add(Shipping shipping)
    {
        try
        {
            _databaseContext.Shippings.Add(shipping);
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
            _databaseContext.Shippings.Remove(_databaseContext.Shippings.FirstOrDefault(acc => acc.Id == id)!);
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public dynamic GetById(int id)
    {
        try
        {
            return _databaseContext.Shippings.AsNoTracking().Where(acc => acc.Id == id)!.Select(acc => new
            {
                Id = acc.Id,
                Weight = acc.Weight,
                Pakage = acc.Pakage,
                Price = acc.Price,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetAllShipping()
    {
        return _databaseContext.Shippings.Select(acc => new
        {
            Id = acc.Id,
            Weight = acc.Weight,
            Pakage = acc.Pakage,
            Price = acc.Price,
            CreateAt = acc.CreateAt,
            UpdateAt = acc.UpdateAt
        }).ToList();
    }

    public bool Update(Shipping shipping)
    {
        try
        {
            _databaseContext.Shippings.Entry(shipping).State = EntityState.Modified;
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public dynamic GetAll()
    {
        return _databaseContext.Shippings.Select(acc => new
        {
            Id = acc.Id,
            Weight = acc.Weight,
            Pakage = acc.Pakage,
            Price = acc.Price,
            CreateAt = acc.CreateAt,
            UpdateAt = acc.UpdateAt,
        }).ToList();
    }

    public dynamic GetByIdp(string pakage)
    {
        try
        {
            return _databaseContext.Shippings.AsNoTracking().Where(acc => acc.Pakage == pakage)!.Select(acc => new
            {
                Price = acc.Price
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }


    public dynamic GetByIdButPrice(int id)
    {

        return _databaseContext.Shippings.FirstOrDefault(acc => acc.Id == id).Price;
        
    }
}
