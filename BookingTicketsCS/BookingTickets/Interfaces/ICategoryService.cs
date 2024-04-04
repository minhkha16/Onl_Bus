using BookingTickets.Models;

namespace BookingTickets.Interfaces;

public interface ICategoryService
{
    public bool Add(CategoryCar category);
    public dynamic GetById(int id);
    public bool Update(CategoryCar category); 
    public bool Delete(int id);
    public dynamic GetAllCategory();
    public dynamic GetAllCategoryDetail(int id);


}
