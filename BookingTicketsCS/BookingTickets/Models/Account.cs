using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class Account
{
    public int Id { get; set; }

    public string FullName { get; set; } = null!;

    public DateTime DoB { get; set; }

    public string Address { get; set; } = null!;

    public string? Email { get; set; }

    public string Password { get; set; } = null!;

    public string Phone { get; set; } = null!;

    public byte Level { get; set; }

    public string? SecurityCode { get; set; }

    public bool Status { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual ICollection<DiscountDetail> DiscountDetails { get; set; } = new List<DiscountDetail>();

    public virtual ICollection<InvoiceCar> InvoiceCars { get; set; } = new List<InvoiceCar>();

    public virtual ICollection<InvoiceShipping> InvoiceShippings { get; set; } = new List<InvoiceShipping>();

    public virtual ICollection<WorkSchedule> WorkSchedules { get; set; } = new List<WorkSchedule>();
}
