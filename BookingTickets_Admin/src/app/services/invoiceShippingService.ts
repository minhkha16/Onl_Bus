import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { PathAdminService } from "./path.service";
import { InvoiceShipping } from "../models/invoiceShipping.model";

@Injectable()

export class InvoiceShippingService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}

    async addInvoiceShipping(invoiceShipping: InvoiceShipping){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `invoice/add`, invoiceShipping));
    }

    async getAllShipping(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'invoice/findAll'));
    }

    async delete(id: number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `invoice/delete/${id}`))
    }

    
    async getTotal(id: number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `invoice/findTotal/${id}`));
    }
}