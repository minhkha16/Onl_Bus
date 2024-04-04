using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class TimeLine
{
    public int Id { get; set; }

    public string? Line { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual ICollection<ChairCar> ChairCars { get; set; } = new List<ChairCar>();

    public virtual ICollection<WorkSchedule> WorkSchedules { get; set; } = new List<WorkSchedule>();
}
