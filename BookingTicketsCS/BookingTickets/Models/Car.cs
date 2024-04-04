using System;
using System.Collections.Generic;

namespace BookingTickets.Models;

public partial class Car
{
    public string LicensePlates { get; set; } = null!;

    public string? NameCar { get; set; }

    public DateTime? RegistrationDate { get; set; }

    public int IdCategory { get; set; }

    public DateTime? CreateAt { get; set; }

    public DateTime? UpdateAt { get; set; }

    public virtual ICollection<ChairCar> ChairCars { get; set; } = new List<ChairCar>();

    public virtual CategoryCar IdCategoryNavigation { get; set; } = null!;

    public virtual ICollection<WorkSchedule> WorkSchedules { get; set; } = new List<WorkSchedule>();
}
