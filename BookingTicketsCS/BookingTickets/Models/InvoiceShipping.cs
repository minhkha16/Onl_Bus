using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class InvoiceShipping
{
    public int Id { get; set; }

    public string? RecipientName { get; set; }

    public string? RecipientPhone { get; set; }

    public string? RecipientAddress { get; set; }

    public string? DeliveryName { get; set; }

    public string? DeliveryPhone { get; set; }

    public string? DeliveryAddress { get; set; }

    public int? IdAccount { get; set; }

    public int? IdShipping { get; set; }

    public bool? Status { get; set; }

    public string? Payment { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public int? Total { get; set; }

    public virtual Account? IdAccountNavigation { get; set; }

    public virtual Shipping? IdShippingNavigation { get; set; }
}
