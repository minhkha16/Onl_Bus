using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class Shipping
{
    public int Id { get; set; }

    public string Pakage { get; set; } = null!;

    public int? Weight { get; set; }

    public int? Price { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual ICollection<InvoiceShipping> InvoiceShippings { get; set; } = new List<InvoiceShipping>();
}
