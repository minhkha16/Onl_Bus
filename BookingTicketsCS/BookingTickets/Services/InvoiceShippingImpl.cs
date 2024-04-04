using BookingTickets.Interfaces;
using BookingTickets.Models;
using Microsoft.EntityFrameworkCore;

namespace BookingTickets.Services;

public class InvoiceShippingImpl : IinvoiceShippingService
{
    private readonly DatabaseContext _databaseContext;

    public InvoiceShippingImpl(DatabaseContext databaseContext)
    {
        _databaseContext = databaseContext;
    }

    public bool Add(InvoiceShipping inoivce)
    {
        try
        {
            _databaseContext.InvoiceShippings.Add(inoivce);
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
            _databaseContext.InvoiceShippings.Remove(_databaseContext.InvoiceShippings.FirstOrDefault(acc => acc.Id == id)!);
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
            return _databaseContext.InvoiceShippings.AsNoTracking().Where(acc => acc.Id == id)!.Select(acc => new
            {
                Id = acc.Id,
                RecipientName = acc.RecipientName,
                RecipientPhone = acc.RecipientPhone,
                RecipientAddress = acc.RecipientAddress,
                DeliveryName = acc.DeliveryName,
                DeliveryPhone = acc.DeliveryPhone,
                DeliveryAddress = acc.DeliveryAddress,
                IdAccount = acc.IdAccount,
                Total = acc.Total,
                IdShipping = acc.IdShipping,
                CreateAt = acc.CreateAt,
                UpdateAt = acc.UpdateAt
            }).FirstOrDefault()!;
        }
        catch
        {
            return null!;
        }
    }

    public dynamic GetAllInvoice()
    {
        return _databaseContext.InvoiceShippings.Select(acc => new
        {
            Id = acc.Id,
            RecipientName = acc.RecipientName,
            RecipientPhone = acc.RecipientPhone,
            RecipientAddress = acc.RecipientAddress,
            DeliveryName = acc.DeliveryName,
            DeliveryPhone = acc.DeliveryPhone,
            DeliveryAddress = acc.DeliveryAddress,
            Payment = acc.Payment,
            Total = acc.Total,
            Status = acc.Status,
            IdAccount = acc.IdAccount,
            IdShipping = acc.IdShipping,
            CreateAt = acc.CreateAt,
            UpdateAt = acc.UpdateAt
        }).ToList();
    }

    public bool Update(InvoiceShipping invoice)
    {
        try
        {
            _databaseContext.InvoiceShippings.Entry(invoice).State = EntityState.Modified;
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }

    public dynamic GetByTotal(int id)
    {
        return _databaseContext.InvoiceShippings.FirstOrDefault(acc => acc.Id == id).Total;
    }

    public dynamic GetByIdInvoiceShipping(int id)
    {
        return _databaseContext.InvoiceShippings.Where(p => p.Id == id).Select(acc => new
        {
            Id = acc.Id,
            RecipientName = acc.RecipientName,
            RecipientPhone = acc.RecipientPhone,
            RecipientAddress = acc.RecipientAddress,
            DeliveryName = acc.DeliveryName,
            DeliveryPhone = acc.DeliveryPhone,
            DeliveryAddress = acc.DeliveryAddress,
            Payment = acc.Payment,
            Total = acc.Total,
            Status = acc.Status,
            IdAccount = acc.IdAccount,
            IdShipping = acc.IdShipping,
            CreateAt = acc.CreateAt,
            UpdateAt = acc.UpdateAt
        }).FirstOrDefault()!;
    }

    public bool UpdateStatus(InvoiceShipping invoice)
    {
        try
        {
            _databaseContext.InvoiceShippings.Entry(invoice).State = EntityState.Modified;
            return _databaseContext.SaveChanges() > 0;
        }
        catch
        {
            return false;
        }
    }
}
