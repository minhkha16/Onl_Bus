import { Component, OnInit } from "@angular/core";
import { Route, Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { InvoiceCarService } from "../Services/invoiceCar.service";
import { IWorkScheduleService } from "../Services/IWorkShedule.service";
import { WorkScheduleModel } from "../Models/workschedule.model";
import { InvoiceModel } from "../Models/invoice.model";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
    templateUrl: './myInvoice.component.html'
})

export class MyInvoiceComponent implements OnInit{

    constructor(private _invoiceCar: InvoiceCarService,
        private _IWorkSchedules : IWorkScheduleService,
        private _router: Router,
        private confirmationService: ConfirmationService, 
        private messageService: MessageService
        ){}

    first = 0;

    rows = 10;

    invoiceCar: InvoiceModel[];

    progess: InvoiceModel[];

    completed: InvoiceModel[];

    workschedules : WorkScheduleModel[];

    workschedules2 : WorkScheduleModel[];

    getByIdAccount : WorkScheduleModel[] = [];

    today : string;

    level : number;

    ngOnInit(): void {

        this.level = Number(sessionStorage.getItem('level'));

        this.today = formatDate(Date.now().toString(),"dd/MM/yyyy","en-US");

        if(sessionStorage.getItem('level')!=='3'){
            this._router.navigate(['/notfound']);
        }

        let idAccount =  Number(sessionStorage.getItem('idAccount'));
        console.log(idAccount);
        
        // sessionStorage.setItem('idAccount', '1');

        //InPorgess
        this._IWorkSchedules.getByIdAccountAndStatusAndDateBook(idAccount,"InProgress",formatDate(Date.now(),"dd-MM-yyyy","EN-US")).then(response=>{
            console.log("response InProgress : "  , response);
            this.workschedules = response as WorkScheduleModel[];
        },er=> console.log(er))

        //Completed
        this._IWorkSchedules.getWorkScheduleCompleted(idAccount, 'Completed').then(response=>{
            this.workschedules2 = response as WorkScheduleModel[];
        },er=> console.log(er))

        
    }

    firstPage = 5;
    
    next() {
        console.log(this.first);
        this.first = this.first + this.rows;
    }
    
    prev() {
        this.first = this.first - this.rows;
    }
    
    reset() {
        this.first = 0;
    }

    isLastPage(): boolean {
        return this.workschedules ? this.first === this.workschedules.length - this.rows : true;
    }
    
    isFirstPage(): boolean {
        return this.workschedules ? this.first === 0 : true;
    }
    
    ChangeProgess(id : number){

        const verifyATrip = prompt('Press y to complete ur trip.');

        if(verifyATrip.match('y')){
            this._IWorkSchedules.GetById(id).then(respose=>{
                var i : WorkScheduleModel = respose as WorkScheduleModel;
                i.status = "Completed";
                this._IWorkSchedules.update(i).then(respose=>{
                    if(respose){
                        this.messageService.add({ 
                            severity: 'success', 
                            summary: 'Notification', 
                            detail: `A trip completed.` });
    
                            setTimeout(()=>{
                                location.reload();
                            },2000);
    
                    }else{
                        this.messageService.add({ 
                            severity: 'error', 
                            summary: 'Error', 
                            detail: `Failure.` });
                    }
                },er=>console.log(er));
            },er=> console.log(er));            
        }else{
            this.messageService.add({ 
                severity: 'info', 
                summary: 'Notification', 
                detail: `U doesn't complete a trip.` });
        }
    }
}
