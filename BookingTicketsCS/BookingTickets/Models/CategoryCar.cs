using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class CategoryCar
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual ICollection<Car> Cars { get; set; } = new List<Car>();
}
