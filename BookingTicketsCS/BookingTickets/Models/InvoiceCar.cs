using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class InvoiceCar
{
    public int Id { get; set; }

    public DateTime? Date { get; set; }

    public string? Note { get; set; }

    public int? Total { get; set; }

    public string? Status { get; set; }

    public int IdAccount { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual Account IdAccountNavigation { get; set; } = null!;

    public virtual ICollection<InvoiceDetailCar> InvoiceDetailCars { get; set; } = new List<InvoiceDetailCar>();
}
