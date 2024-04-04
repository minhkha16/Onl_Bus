using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class DiscountDetail
{
    public int Id { get; set; }

    public int IdAccount { get; set; }

    public int IdDiscount { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual Account IdAccountNavigation { get; set; } = null!;

    public virtual Discount IdDiscountNavigation { get; set; } = null!;
}
