import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { lastValueFrom } from "rxjs";
import { InvoiceModel } from "../Models/invoice.model";

@Injectable()

export class InvoiceCarService {
    constructor(private _http: HttpClient,
         private _path: PathService){}
    
    async creationInvoiceCar(model: InvoiceModel){
        return await lastValueFrom(this._http.post(this._path.path() + `invoiceCar/create`, model));
    }

    async updateInvoiceCar(model: InvoiceModel){
        return await lastValueFrom(this._http.put(this._path.path() + `invoiceCar/update`, model));
    }

    async getInvoiceCarByIdAccount(idAccount: number){
        return await lastValueFrom(this._http.get(this._path.path() + `invoiceCar/getByIdAccount/${idAccount}`));
    }

    async getProgess(idAccount: number){
        return await lastValueFrom(this._http.get(this._path.path() + `invoiceCar/inprogess/${idAccount}`));
    }

    async getCompleted(idAccount: number){
        return await lastValueFrom(this._http.get(this._path.path() + `invoiceCar/completed/${idAccount}`));
    }
    
    async getById(idAccount: number){
        return await lastValueFrom(this._http.get(this._path.path() + `invoiceCar/getById/${idAccount}`));
    }  

    async getByIdAccountAndStatus(idAccount: number, status : string){
        return await lastValueFrom(this._http.get(this._path.path() + `invoiceCar/getByIdAccountAndStatus/${idAccount}/${status}`));
    }  
}