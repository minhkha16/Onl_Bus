using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class PlaceTo
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<Freeway> Freeways { get; set; } = new List<Freeway>();
}
