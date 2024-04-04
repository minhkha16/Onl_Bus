using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics;
using System.Globalization;

namespace BookingTickets.Services;

public class AccountServiceImpl : IAccountServive
{
    private readonly DatabaseContext _databaseContext;

    public AccountServiceImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public bool Add(Account acc)
    {
        try
        {
            if (_databaseContext.Accounts.Count() <= 0)
            {
                acc.Level = 0;
                acc.Status = true;
            }
            else if (acc.Level == 2 || acc.Level == 3)
            {
                acc.Status = true;
            }
            acc.Password = BCrypt.Net.BCrypt.HashPassword(acc.Password);

            _databaseContext.Accounts.Add(acc);
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    //public bool Delete(int id)
    //{
    //    try
    //    {
    //        _databaseContext.Accounts.Remove(_databaseContext.Accounts.FirstOrDefault(acc=>acc.Id==id)!);
    //        return _databaseContext.SaveChanges() > 0;
    //    }
    //    catch
    //    {
    //        return false;
    //    }
    //}

    public dynamic FindAll()
    {

        try
        {
            return _databaseContext.Accounts.Where(a => a.Level != 0).Select(acc => new
            {
                Id = acc.Id,
                Fullname = acc.FullName,
                Address = acc.Address,
                Email = acc.Email,
                Phone = acc.Phone,
                Level = acc.Level,
                Status = acc.Status,
                Dob = acc.DoB,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            });
        }
        catch
        {
            return null!;
        }
    }
    public dynamic FindAllDrive()
    {
        try
        {
            return _databaseContext.Accounts.Where(a => a.Level == 3).Select(acc => new
            {
                Id = acc.Id,
                Fullname = acc.FullName,
                Address = acc.Address,
                Email = acc.Email,
                Phone = acc.Phone,
                Level = acc.Level,
                Status = acc.Status,
                Dob = acc.DoB,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            });
        }
        catch
        {
            return null!;
        }
    }

    //public dynamic GetById(int id)
    //{
    //    try
    //    {
    //        return _databaseContext.Accounts.AsNoTracking().Where(acc => acc.Id == id)!.Select(acc => new
    //        {
    //            Id = acc.Id,
    //            Fullname = acc.FullName,
    //            Address = acc.Address,
    //            Email = acc.Email,
    //            Phone = acc.Phone,
    //            Level = acc.Level,
    //            Dob = acc.DoB,
    //            Status = acc.Status,
    //            CreateAt = acc.CreateAt,
    //            UpdateAt = acc.UpdateAt
    //        }).FirstOrDefault()!;
    //    }
    //    catch
    //    {
    //        return null!;
    //    }
    //}

    //public bool Login(string email, string password)
    //{
    //    try
    //    {
    //        var ac = _databaseContext.Accounts.SingleOrDefault(a => a.Email == email);
    //        if(ac != null)
    //        {
    //            Debug.WriteLine(ac.Password);
    //            Debug.WriteLine(password);
    //            if(BCrypt.Net.BCrypt.Verify(password, ac.Password) && ac.Status == true)
    //            {
    //                return true;
    //            }
    //            else
    //            {
    //                return false;
    //            }
    //        }
    //        else
    //        {
    //            return false;
    //        }
    //    }
    //    catch (Exception)
    //    {

    //        return false;
    //    }
    //}

    //public bool Update(Account acc)
    //{
    //    try
    //    {
    //        _databaseContext.Accounts.Entry(acc).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
    //        return _databaseContext.SaveChanges() > 0;
    //    }
    //    catch
    //    {
    //        return false;
    //    }
    //}








    //public bool Add(Account acc)
    //{
    //    try
    //    {
    //        acc.Password = BCrypt.Net.BCrypt.HashPassword(acc.Password);

    //        _databaseContext.Accounts.Add(acc);
    //        return _databaseContext.SaveChanges() > 0;
    //    }
    //    catch
    //    {
    //        return false;
    //    }
    //}

    public bool Delete(int id)
    {
        try
        {
            _databaseContext.Accounts.Remove(_databaseContext.Accounts.FirstOrDefault(acc => acc.Id==id)!);
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
            return _databaseContext.Accounts.Where(i => i.Level == 3).Select(a => new
            {
                Id = a.Id,
                FullName = a.FullName,
                Address = a.Address,
                Email = a.Email,
                Phone = a.Phone,
                Level = a.Level,
                Dob = a.DoB,
                Status = a.Status,
                CreateAt =  a.CreateAt,
                UpdateAt = a.UpdateAt
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
            return _databaseContext.Accounts.AsNoTracking().Where(acc => acc.Id == id)!.Select(acc => new
            {
                Id = acc.Id,
                FullName = acc.FullName,
                Dob = acc.DoB,
                Address = acc.Address,
                Email = acc.Email,
                Phone = acc.Phone,
                Level = acc.Level,
                Status = acc.Status,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetByEmail(string email)
    {
        try
        {
            return _databaseContext.Accounts.Where(a => a.Email == email).Select(a => new
            {
                Id = a.Id,
                FullName = a.FullName,
                Address = a.Address,
                DoB = a.DoB,
                Email = a.Email,
                Phone = a.Phone,
                Level = a.Level,
                Status = a.Status,
                SecurityCode = a.SecurityCode,
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public bool Login(string email, string password)
    {
        try
        {
            var username = _databaseContext.Accounts.FirstOrDefault(l => l.Email == email);

            if (username!=null && username.Status == true)
            {
                return BCrypt.Net.BCrypt.Verify(password, username.Password);
            }

            return false;
        }
        catch
        {
            return false;
        }
    }

    public bool Update(Account acc)
    {
        try
        {
            _databaseContext.Accounts.Entry(acc).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public Account GetById2(int id)
    {
        try
        {
            return _databaseContext.Accounts.AsNoTracking().FirstOrDefault(a => a.Id == id)!;
        }
        catch
        {
            return null!;
        }
    }

    public bool CheckEmailExists(string email)
    {
        try
        {
            return _databaseContext.Accounts.Count(a => a.Email == email) > 0;
        }
        catch
        {
            return false;
        }
    }

    public bool? CheckStatus(string email)
    {
        try
        {
            return _databaseContext.Accounts.FirstOrDefault(e => e.Email == email)!.Status;
        }
        catch
        {
            return false;
        }
    }

    public Account CheckByEmail(string email)
    {
        try
        {
            return _databaseContext.Accounts.FirstOrDefault(a => a.Email == email)!;
        }
        catch
        {
            return null!;
        }
    }
}
