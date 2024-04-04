using BookingTickets.Converteds;
using BookingTickets.Interfaces;
using BookingTickets.Models;
using BookingTickets.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var connectionStrings = builder.Configuration["ConnectionStrings:DefaultConnection"];

//builder.Services.AddScoped<IInvoiceCarService, InvoiceCarImpl>();

builder.Services.AddScoped<IChairCarService, ChairCarServiceImpl>();

builder.Services.AddDbContext<DatabaseContext>(option => option.UseLazyLoadingProxies().UseSqlServer(connectionStrings));

builder.Services.AddScoped<ICarService, CarServiceImpl>();
builder.Services.AddScoped<IChairCarService, ChairCarServiceImpl>();
builder.Services.AddScoped<IFreewayService, FreewayServiceImpl  >();
builder.Services.AddScoped<IInvoiceCarService, InvoiceCarImpl  >();

builder.Services.AddScoped<ICategoryService, CategoryServiceImpl>();

builder.Services.AddScoped<IShippingService, ShippingServiceImpl>();

builder.Services.AddScoped<IDiscountService, DiscountServiceImpl>();
builder.Services.AddScoped<IInvoiceDetailCarService, InvoiceDetailCarServiceImpl>();
builder.Services.AddScoped<IinvoiceShippingService, InvoiceShippingImpl>();
builder.Services.AddScoped<ITimeService, TimeServiceImpl>();

builder.Services.AddScoped<IWorkSchedulesService, WorkSchedulesServiceImpl>();
builder.Services.AddScoped<IPlaceFromService, PlaceFromServiceImpl>();
builder.Services.AddScoped<IPlaceToService, PlaceToServiceImpl>();
builder.Services.AddScoped<IAccountServive, AccountServiceImpl>();
builder.Services.AddScoped<IChairCarService, ChairCarServiceImpl>();
builder.Services.AddCors();

builder.Services.AddControllers().AddJsonOptions(option =>
{
    option.JsonSerializerOptions.Converters.Add(new DateConverted());
});

var app = builder.Build();

app.UseCors(builder => builder
    .AllowAnyHeader()
    .AllowAnyMethod()
    .SetIsOriginAllowed((host) => true)
    .AllowCredentials()
);

app.MapGet("/", () => "Hello World!");

app.MapControllers();

app.UseStaticFiles();

app.Run();