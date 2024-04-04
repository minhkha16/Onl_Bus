import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { InvoiceShipping } from "../Models/invoiceShipping.model ";

@Injectable()

export class InvoiceShippingService{
    constructor(private _pathService: PathService,private _httpClient: HttpClient){}

    async addInvoiceShipping(invoiceShipping: InvoiceShipping){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `invoice/add`, invoiceShipping));
    }

    async getAllShipping(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'invoice/findAll'));
    }

    async delete(id: number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `invoice/delete/${id}`))
    }

    async updateShipping(invoiceShipping: InvoiceShipping){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + `invoice/update`, invoiceShipping));
    }

    async getTotal(id: number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `invoice/findTotal/${id}`));
    }

    async findAllStatus(id: number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `invoice/findAllByStatus/${id}`));
    }
}