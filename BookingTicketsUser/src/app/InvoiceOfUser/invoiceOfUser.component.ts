import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { InvoiceModel } from "../Models/invoice.model";
import { InvoiceCarService } from "../Services/invoiceCar.service";

@Component({
    templateUrl: './invoiceOfUser.component.html'
})

export class InvoiceOfUserComponent implements OnInit{

    constructor(private readonly _InvoiceDetails : InvoiceCarService,
        private readonly _route : Router){}

    invoices: InvoiceModel[];

    dateBook : string;

    ngOnInit(): void {
        this._InvoiceDetails.getByIdAccountAndStatus(Number(sessionStorage.getItem('idAccount')),'success').then(response=>{
            console.log(response);
            this.invoices = response as InvoiceModel[];
            
        },er=>console.log(er));
    }
    
    date(date : string){
        
        this.dateBook = date;
        
    }

    navigation(id : number){
        this._route.navigate(['/invoiceDetails',{idInvoice : id, date : this.dateBook}]);
    }
}