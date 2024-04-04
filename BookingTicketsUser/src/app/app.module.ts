import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AvatarModule } from 'primeng/avatar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlightComponent } from './Flight/flight.component';
import { HomeBusComponent } from './Home_Bus/homeBus.component';
import { CartComponent } from './Cart/cart.component';
import { HeaderComponent } from './Header/header.component';
import { DetailsComponent } from './Details/details.component';
import { PathService } from './Services/path.service';
import { CategoryCarService } from './Services/categoryCarService';
import { CarService } from './Services/carService';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlaceFromapi } from './Services/placefromapi.service';
import { CalendarModule } from 'primeng/calendar';
import { CarComponent } from './Car/car.component';
import { Timeapi } from './Services/timeapi.service';
import { Carapi } from './Services/carapi.service';
import { Categoryapi } from './Services/categoryapi.service';
import { BookchairComponent } from './Chair/chair.component';
import { IChairService } from './Services/chair.service';
import { IChairCarService } from './Services/chaircar.service';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService, MessageService } from 'primeng/api';
import { IAccountService } from './Services/account.service';
import { VerifyComponent } from './VerifyCode/veryfycode.component';
import { CardModule } from 'primeng/card';
import { NgxPayPalModule } from 'ngx-paypal';
import { TestComponent } from './test.component';
import { IInvoicesService } from './Services/invoice.service';
import { InvoiceModel } from './Models/invoice.model';
import { IInvoiceDetailService } from './Services/invoicedetail.service';
import { DiscountService } from './Services/discount.service';
import { ButtonModule } from 'primeng/button';
import { LoginComponent } from './Login/login.component';
import { RegisterComponent } from './Register/register.component';
import { ChangePasswordComponent } from './ChangePassword/changePassword.component';
import { InvoiceOfUserComponent } from './InvoiceOfUser/invoiceOfUser.component';
import { TableModule } from 'primeng/table';
import { ProfileComponent } from './Profile/profile.component';
import { InvoiceCarService } from './Services/invoiceCar.service';
import { MyInvoiceComponent } from './MyInvoices/myInvoice.component';
import { IWorkScheduleService } from './Services/IWorkShedule.service';
import { BookingComponent } from './Booking/booking.component';
import { PathAdminService } from './Services/pathAdmin.service';
import { ShippingService } from './Services/shipping.service';
import { InvoiceShippingService } from './Services/invoiceShippingService (1)';
import { DropdownModule } from 'primeng/dropdown';
import { ViewComponent } from './ViewBooking/view.component';
@NgModule({
  declarations: [
    AppComponent,
    FlightComponent,
    HomeBusComponent,
    CartComponent,
    HeaderComponent,
    DetailsComponent,
    CarComponent,
    BookchairComponent,
    VerifyComponent,
    TestComponent,
    LoginComponent,
    RegisterComponent,
    ChangePasswordComponent,
    InvoiceOfUserComponent,
    ProfileComponent,
    MyInvoiceComponent,
    BookingComponent,
    ViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    ToastModule,
    MessagesModule,
    ConfirmPopupModule,
    CardModule,
    NgxPayPalModule,
    ToastModule,
    MessagesModule,
    ButtonModule,
    TableModule,
    DropdownModule,
    AvatarModule
  ],
  providers: [
    PathService,
    CategoryCarService,
    CarService,
    PlaceFromapi,
    Timeapi,
    Carapi,
    Categoryapi,
    IChairService,
    IChairCarService,
    ConfirmationService, 
    MessageService,
    IAccountService,
    IInvoicesService,
    IInvoiceDetailService,
    DiscountService,
    InvoiceCarService ,
    IWorkScheduleService,
    PathAdminService,
    ShippingService,
    InvoiceShippingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
