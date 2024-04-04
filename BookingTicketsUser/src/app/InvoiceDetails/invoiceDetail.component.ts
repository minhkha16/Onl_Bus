import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { formatDate } from "@angular/common";

@Component({
    templateUrl: './invoiceDetail.component.html',
})

export class InvoiceDetailComponent implements OnInit {
    ngOnInit(): void {

    }

    // constructor(private readonly _IInvoiceDetail : InvoiceDetailService,
    //     private readonly _ActivatedRouter : ActivatedRoute){}

    // invoices: InvoiceDetailsModel[] = [];

    // ngOnInit(): void {
    //     this._ActivatedRouter.paramMap.subscribe(asignments => {

    //         const id = Number(asignments.get('idInvoice'));
    //         const date = formatDate(asignments.get('date'),"dd-MM-yyyy","EN-US");

    //         console.log(id);
    //         console.log(date);
    //         console.log(sessionStorage.getItem('idAccount'));

    //         this._IInvoiceDetail.getPrice(id, Number(sessionStorage.getItem('idAccount')),'72K1 - 72893',date).then(response=>{
    //             console.log("details : ",response);
                
    //             this.invoices = response as InvoiceDetailsModel[];
            
    //         },er=>console.log(er));
    //     });
    // }
    
}