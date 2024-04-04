import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { EditorModule } from 'primeng/editor';
import { CalendarModule } from 'primeng/calendar';
import { CheckboxModule } from 'primeng/checkbox';
import { LoginComponent } from './Authorization/Login/login.component';
import { HomepageComponent } from './HomePage/homepage.component';
import { BackgroundComponent } from './Authorization/Background/background.component';
import { RegistrationComponent } from './Authorization/Registration/registration.component';
import { AddTimeComponent } from './TimeLine/AddTime/addtimepage.component';
import { EditTimeComponent } from './TimeLine/EditTime/edittimepage.component';
import { ListTimeComponent } from './TimeLine/ListTime/listtime.component';
import { addFormToComponent } from './FormTo/AddFromTo/addFormTo.component';
import { ListFormComponent } from './FormTo/ListFromTo/listForm.component';
import { ListToComponent } from './FormTo/ListFromTo/listTo.component';
import { EditFromComponent } from './FormTo/EditFromTo/editForm.component';
import { addCateComponent } from './CategoryCar/add/add.component';
import { editCateComponent } from './CategoryCar/edit/edit.component';
import { listCateComponent } from './CategoryCar/list/list.component';
import { listCarComponent } from './Car/list/list.component';
import { editCarComponent } from './Car/edit/edit.component';
import { addCarComponent } from './Car/add/add.component';
import { PathAdminService } from './services/path.service';
import { DiscountService } from './services/discountService';
import { CreationDisComponent } from './Functionality/Creation/Discount/creationDis.component';
import { listWorkComponent } from './WorkSchedule/list/list.component';
import { editWorkComponent } from './WorkSchedule/edit/edit.component';
import { addWorkComponent } from './WorkSchedule/add/add.component';
import { CarService } from './services/CarService';
import { TimeService } from './services/timeService';
import { CateService } from './services/cateService';
import { FromToService } from './services/fromtoService';
import { FreewaysService } from './services/freewaysService';
import { ViewFreewayComponent } from './Freeway/View/view.component';
import { EditFreewayComponent } from './Freeway/Edit/edit.component';
import { CreationFreewayComponent } from './Freeway/Add/add.component';
import { AccountService } from './services/account.service';
import { AddAccountComponent } from './Account/AddAccount/addAccount.component';
import { listAccountComponent } from './Account/ListAccount/listAccount.component';
import { editAccountComponent } from './Account/EditAccount/editAccount.component';
import { WorkSchedule } from './models/workschedule.model';
import { WorkScheduleService } from './services/workSchedule.service';
import { TableModule } from 'primeng/table';
import { EditToComponent } from './FormTo/EditFromTo/editTo.component';
import { InvoiceShippingService } from './services/invoiceShippingService';
import { addShippingComponent } from './InvoiceShipping/Add/add.component';
import { ShippingService } from './services/shippingService';
import { listShippingComponent } from './InvoiceShipping/List/list.component.';
import { editShippingComponent } from './InvoiceShipping/Edit/edit.component';
import { addDiscountComponent } from './Discount/Add/add.component';
import { editDiscountComponent } from './Discount/Edit/edit.component';
import { listDiscountComponent } from './Discount/List/list.component.';
import { ListChairComponent } from './ListChair/list.component';
import { ListChairService } from './services/listchair.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomepageComponent,
    BackgroundComponent,
    RegistrationComponent,
    AddTimeComponent,
    EditTimeComponent,
    ListTimeComponent,
    addFormToComponent,
    ListFormComponent,
    ListToComponent,
    EditFromComponent,
    addCateComponent,
    editCateComponent,
    listCateComponent,
    listCarComponent,
    editCarComponent,
    addCarComponent,
    CreationDisComponent,
    listWorkComponent,
    editWorkComponent,
    addWorkComponent,
    ViewFreewayComponent,
    EditFreewayComponent,
    CreationFreewayComponent,
    AddAccountComponent,
    listAccountComponent,
    editAccountComponent,
    EditToComponent,
    addShippingComponent,
    listShippingComponent,
    editShippingComponent,
    addDiscountComponent,
    editDiscountComponent,
    listDiscountComponent,
    ListChairComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    FileUploadModule,
    BrowserAnimationsModule,
    EditorModule,
    CalendarModule,
    CheckboxModule,
    TableModule
  ],
  providers: [
    PathAdminService,
    DiscountService,
    CarService,
    TimeService,
    CateService,
    FromToService,
    FreewaysService,
    AccountService,
    WorkScheduleService,
    InvoiceShippingService,
    ShippingService,
    ListChairService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
