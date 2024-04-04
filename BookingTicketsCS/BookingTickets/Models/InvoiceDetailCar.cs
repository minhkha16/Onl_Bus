using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class InvoiceDetailCar
{
    public int Id { get; set; }

    public int IdChairCar { get; set; }

    public int IdIvoiceCar { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual ChairCar IdChairCarNavigation { get; set; } = null!;

    public virtual InvoiceCar IdIvoiceCarNavigation { get; set; } = null!;
}
