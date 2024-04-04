import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { ChairCarModel } from "../Models/chaircar.model";
import { InvoiceModel } from "../Models/invoice.model";

@Injectable()

export class IInvoicesService {
   
    constructor(private _path : PathService,
        private _httpClient : HttpClient){}
        
    async checkInvoice(idAccount :number){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `invoiceCar/checkInvoice/` +idAccount));
    }
    async getTotalPrice(idAccount :number){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `invoiceCar/getTotalPrice/` +idAccount));
    }
    async getIdInvoice(idAccount :number){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `invoiceCar/getIdInvoice/` +idAccount));
    }
    async Add(model : InvoiceModel){
        return await lastValueFrom(this._httpClient.post(this._path.path() + `invoiceCar/add`,model));
    }
    async update(model : InvoiceModel){
        return await lastValueFrom(this._httpClient.put(this._path.path() + `invoiceCar/update`,model));
    }
    async getByIdAccount(idAccount : number){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `invoiceCar/getByIdAccount/` +idAccount));
    }

}