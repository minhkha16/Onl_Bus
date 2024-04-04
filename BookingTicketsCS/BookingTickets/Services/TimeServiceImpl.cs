using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingTickets.Services;

public class TimeServiceImpl : ITimeService
{
    private readonly DatabaseContext _databaseContext;

    public TimeServiceImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public bool Add(TimeLine timeline)
    {
        try
        {
            _databaseContext.TimeLines.Add(timeline);
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
            if (_databaseContext.ChairCars.Where(a => a.IdTimeLine == id) != null && _databaseContext.WorkSchedules.Where(b => b.IdTimeLine == id) != null)
            {
                _databaseContext.TimeLines.Remove(_databaseContext.TimeLines.FirstOrDefault(acc => acc.Id == id)!);
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
            return _databaseContext.TimeLines.AsNoTracking().Select(acc => new
            {
                Id = acc.Id,
                Line = acc.Line,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            }).ToList();
        }
        catch
        {
            return null!;
        }
    }
    public dynamic GetAll()
    {
        try
        {
            return _databaseContext.TimeLines.Select(acc => new
            {
                id = acc.Id,
                line = acc.Line,
                code = "a" + acc.Id,
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
            return _databaseContext.TimeLines.AsNoTracking().Where(acc => acc.Id == id)!.Select(acc => new
            {
                Id = acc.Id,
                Line = acc.Line,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetByLine(string line)
    {
        try
        {
            return _databaseContext.TimeLines.AsNoTracking().Where(acc => acc.Line.Contains(line))!.Select(acc => new
            {
                Id = acc.Id,
                Line = acc.Line,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            }).ToList();
        }
        catch
        {
            return null!;
        }
    }

    public bool Update(TimeLine time)
    {
        try
        {
            _databaseContext.TimeLines.Entry(time).State = EntityState.Modified;
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }
    
}
