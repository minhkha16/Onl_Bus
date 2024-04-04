import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './HomePage/homepage.component';
import { LoginComponent } from './Authorization/Login/login.component';
import { BackgroundComponent } from './Authorization/Background/background.component';
import { RegistrationComponent } from './Authorization/Registration/registration.component';
import { AddTimeComponent } from './TimeLine/AddTime/addtimepage.component';
import { EditTimeComponent } from './TimeLine/EditTime/edittimepage.component';
import { ListTimeComponent } from './TimeLine/ListTime/listtime.component';
import { ListToComponent } from './FormTo/ListFromTo/listTo.component';
import { ListFormComponent } from './FormTo/ListFromTo/listForm.component';
import { addFormToComponent } from './FormTo/AddFromTo/addFormTo.component';
import { EditFromComponent } from './FormTo/EditFromTo/editForm.component';
import { listCarComponent } from './Car/list/list.component';
import { addCarComponent } from './Car/add/add.component';
import { listCateComponent } from './CategoryCar/list/list.component';
import { addCateComponent } from './CategoryCar/add/add.component';
import { editCateComponent } from './CategoryCar/edit/edit.component';
import { addWorkComponent } from './WorkSchedule/add/add.component';
import { listWorkComponent } from './WorkSchedule/list/list.component';
import { EditFreewayComponent } from './Freeway/Edit/edit.component';
import { ViewFreewayComponent } from './Freeway/View/view.component';
import { CreationFreewayComponent } from './Freeway/Add/add.component';
import { AddAccountComponent } from './Account/AddAccount/addAccount.component';
import { listAccountComponent } from './Account/ListAccount/listAccount.component';
import { editAccountComponent } from './Account/EditAccount/editAccount.component';
import { editCarComponent } from './Car/edit/edit.component';
import { editWorkComponent } from './WorkSchedule/edit/edit.component';
import { EditToComponent } from './FormTo/EditFromTo/editTo.component';
import { addShippingComponent } from './InvoiceShipping/Add/add.component';
import { listShippingComponent } from './InvoiceShipping/List/list.component.';
import { editShippingComponent } from './InvoiceShipping/Edit/edit.component';
import { listDiscountComponent } from './Discount/List/list.component.';
import { addDiscountComponent } from './Discount/Add/add.component';
import { editDiscountComponent } from './Discount/Edit/edit.component';
import { ListChairComponent } from './ListChair/list.component';

const routes: Routes = [
  {path: '',component: HomepageComponent,children: 
  [ 
      { path: '',component: listAccountComponent },
      { path: 'addtime',component: AddTimeComponent },
      {path: 'home',component: HomepageComponent},
      { path: 'edittime',component: EditTimeComponent },
      { path: 'listtime',component: ListTimeComponent },
      { path: 'listto',component: ListToComponent },
      { path: 'listfrom',component: ListFormComponent },
      { path: 'addfromto',component: addFormToComponent },
      { path: 'editto',component: EditToComponent },
      { path: 'editfrom',component: EditFromComponent },
      { path: 'listCar',component: listCarComponent },
      { path: 'addcar',component: addCarComponent },
      { path: 'listCate',component: listCateComponent },
      { path: 'addcate',component: addCateComponent },
      { path: 'listWork',component: listWorkComponent },
      { path: 'addWork',component: addWorkComponent },
      { path: 'editcar',component: editCarComponent },
      { path: 'editword',component: editWorkComponent },
      { path: 'editcate',component: editCateComponent },
      { path: 'editFreeway',component: EditFreewayComponent },
      { path: 'listFreeway',component: ViewFreewayComponent },
      { path: 'addFreeway',component: CreationFreewayComponent },
      { path: 'addaccount',component: AddAccountComponent },
      { path: 'listaccount',component: listAccountComponent },
      { path: 'editaccount',component: editAccountComponent },
      { path: 'listShipping',component: listShippingComponent },
      { path: 'addShipping',component: addShippingComponent },
      { path: 'editShipping',component: editShippingComponent },
      { path: 'listDiscount',component: listDiscountComponent },
      { path: 'addDiscount',component: addDiscountComponent },
      { path: 'editDiscount',component: editDiscountComponent },
      { path: 'listchair',component: ListChairComponent }
  ]},
  {
    path:'background',
    component: BackgroundComponent,
    children: [
      {path: '', component: LoginComponent},
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
