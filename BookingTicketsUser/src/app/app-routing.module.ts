import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightComponent } from './Flight/flight.component';
import { HomeBusComponent } from './Home_Bus/homeBus.component';
import { CartComponent } from './Cart/cart.component';
import { HeaderComponent } from './Header/header.component';
import { DetailsComponent } from './Details/details.component';
import { CarComponent } from './Car/car.component';
import { BookchairComponent } from './Chair/chair.component';
import { VerifyComponent } from './VerifyCode/veryfycode.component';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';
import { ChangePasswordComponent } from './ChangePassword/changePassword.component';
import { InvoiceOfUserComponent } from './InvoiceOfUser/invoiceOfUser.component';
import { ProfileComponent } from './Profile/profile.component';
import { MyInvoiceComponent } from './MyInvoices/myInvoice.component';
import { BookingComponent } from './Booking/booking.component';
import { ViewComponent } from './ViewBooking/view.component';

const routes: Routes = [
  {path: '', component: HeaderComponent,children: [
    {path: '', component: FlightComponent},
    {path: 'flight', component: FlightComponent},
    {path: 'homeBus', component: HomeBusComponent},
    {path: 'cart', component: CartComponent},
    {path: 'details', component: DetailsComponent},
    {path: 'car', component: CarComponent},
    {path: 'bookchair', component: BookchairComponent},
    {path: 'verify', component: VerifyComponent},
    {path: 'cart', component: CartComponent},
    {path: 'changPassword', component: ChangePasswordComponent},
    {path: 'invoiceOfUser', component: InvoiceOfUserComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'myWorkSchedule', component: MyInvoiceComponent},
    {path: 'booking', component: BookingComponent},
    {path: 'list', component: ViewComponent},
  
  ]},
  
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
