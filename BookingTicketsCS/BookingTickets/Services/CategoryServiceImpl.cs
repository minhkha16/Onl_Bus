using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore;
namespace BookingTickets.Services;

public class CategoryServiceImpl : ICategoryService
{

    private readonly DatabaseContext _databaseContext;

    public CategoryServiceImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public bool Add(CategoryCar category)
    {
        try
        {
            _databaseContext.CategoryCars.Add(category);
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
            if(_databaseContext.Cars.Where(a=>a.IdCategory== id) != null)
            {
                _databaseContext.CategoryCars.Remove(_databaseContext.CategoryCars.FirstOrDefault(cate => cate.Id == id)!);
                return _databaseContext?.SaveChanges() > 0;
            }
            return false;
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
            return _databaseContext.CategoryCars.AsNoTracking().Where(cate => cate.Id == id)!.Select(cate => new
            {
                Id = cate.Id,
                Name = cate.Name,
                CreateAt = cate.CreateAt,
                UpdateAt = cate.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public bool Update(CategoryCar category)
    {
        try
        {
            _databaseContext.CategoryCars.Entry(category).State = EntityState.Modified; 
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }
    public dynamic GetAllCategory()
    {
        return _databaseContext.CategoryCars.Select(cate => new
        {
            Id = cate.Id,
            Name = cate.Name,
            CreateAt = cate.CreateAt,
            UpdateAt = cate.UpdateAt
        }).ToList();
    }
    public dynamic GetAllCategoryDetail(int id)
    {
        try
        {
            return _databaseContext.Cars.AsNoTracking().Where(cate => cate.IdCategory == id)!.Select(car => new
            {
                LicensePlates = car.LicensePlates,
                RegistrationDate = car.RegistrationDate,
                IdCategory = car.IdCategory,
                CreateAt = car.CreateAt,
                UpdateAt = car.UpdateAt
            });
        }
        catch
        {
            return null!;
        }
    }

}
