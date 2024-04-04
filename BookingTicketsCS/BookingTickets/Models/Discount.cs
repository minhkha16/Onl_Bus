using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class Discount
{
    public int Id { get; set; }

    public string? Content { get; set; }

    public int? Price { get; set; }

    public bool? Status { get; set; }

    public DateTime? DateEnd { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual ICollection<DiscountDetail> DiscountDetails { get; set; } = new List<DiscountDetail>();
}
