using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore;
using System.Globalization;

namespace BookingTickets.Services;

public class CarServiceImpl : ICarService
{
    private readonly DatabaseContext _databaseContext;
    private readonly ICategoryService categoryService;

    public CarServiceImpl(DatabaseContext databaseContext, ICategoryService _categoryService)
    {
        _databaseContext = databaseContext;
        categoryService = _categoryService;
    }

    public bool Add(Car car)
    {
        try
        {
            _databaseContext.Cars.Add(car);
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public bool Delete(string LicensePlates)
    {
        try
        {
            _databaseContext.Cars.Remove(_databaseContext.Cars.FirstOrDefault(car => car.LicensePlates == LicensePlates)!);
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public dynamic GetById(string id)
    {
        try
        {
            return _databaseContext.Cars.AsNoTracking().Where(c => c.LicensePlates == id).Select(car => new
            {
                NameCar = car.NameCar,
                LicensePlates = car.LicensePlates,
                RegistrationDate = car.RegistrationDate,
                IdCategory = car.IdCategory,
                CreateAt = car.CreateAt,
                UpdateAt = car.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public bool Update(Car bus)
    {
        try
        {
            _databaseContext.Cars.Entry(bus).State = EntityState.Modified;
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public dynamic GetAllCar()
    {
        return _databaseContext.Cars.Select(car => new
        {
            LicensePlates = car.LicensePlates,
            NameCar= car.NameCar,
            RegistrationDate = car.RegistrationDate,
            IdCategory = car.IdCategory,
            NameCategory = car.IdCategoryNavigation.Name,
            CreateAt = car.CreateAt,
            UpdateAt = car.UpdateAt
        }).ToList();
    }

    public dynamic GetByCate(int idcate)
    {
        try
        {
            return categoryService.GetAllCategoryDetail(idcate);
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetByWord(string idcar)
    {
        try
        {
            return _databaseContext.WorkSchedules.AsNoTracking().Where(c => c.IdCar == idcar).Select(car => new
            {
                Id = car.Id,
                WordDay = car.WorkDay,
                IdTimeLine = car.IdTimeLine,
                IdFreeWay = car.IdFreeway,
                IdAccount = car.IdAccount,
                CreateAt = car.CreateAt,
                UpdateAt = car.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }
    public dynamic GetByLicensePlates(string LicensePlates)
    {
        try
        {
            return _databaseContext.Cars.AsNoTracking().Where(c => c.LicensePlates == LicensePlates).Select(car => new
            {
                LicensePlates = car.LicensePlates,
                RegistrationDate = car.RegistrationDate,
                IdCategory = car.IdCategory,
                CreateAt = car.CreateAt,
                UpdateAt = car.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }
    public dynamic GetAllCar(int id_time, int id_freeway, string departing)
    {
        try
        {
            return _databaseContext.WorkSchedules.Where(p => p.IdTimeLine == id_time && p.IdFreeway == id_freeway && p.WorkDay == DateTime.ParseExact(departing, "dd-MM-yyyy", CultureInfo.InvariantCulture)).Select(car => new
            {
                licensePlates = car.IdCarNavigation.LicensePlates,
                name = car.IdCarNavigation.NameCar,
                category = car.IdCarNavigation.IdCategoryNavigation.Name,
                quantity_chair = _databaseContext.ChairCars.Count(c => c.IdCar == car.IdCar && c.IdTimeLine == id_time),
                time = id_time,
                departing = departing,
            }).ToList();
        }
        catch
        {
            return null!;
        }
    }
    public dynamic SearchCarByCate(int id_time, int id_freeway, int id_cate, string departing)
    {
        return _databaseContext.WorkSchedules.Where(p => p.IdTimeLine == id_time && p.IdFreeway == id_freeway && p.WorkDay == DateTime.ParseExact(departing, "dd-MM-yyyy", CultureInfo.InvariantCulture) && p.IdCarNavigation.IdCategory == id_cate).Select(car => new
        {
            licensePlates = car.IdCarNavigation.LicensePlates,
            name = car.IdCarNavigation.NameCar,
            category = car.IdCarNavigation.IdCategoryNavigation.Name,
            quantity_chair = _databaseContext.ChairCars.Count(c => c.IdCar == car.IdCar && c.IdTimeLine == id_time),
        }).ToList();
    }
}
