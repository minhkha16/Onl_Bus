import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { ChairCarModel } from "../Models/chaircar.model";
import { InvoiceDetailModel } from "../Models/invoicedetail.model";

@Injectable()

export class IInvoiceDetailService {
   
    constructor(private _path : PathService,
        private _httpClient : HttpClient){}
    async Add(model : InvoiceDetailModel){
        return await lastValueFrom(this._httpClient.post(this._path.path() + `invoiceCarDetail/add`,model));
    }
    async Update(model : ChairCarModel){
        return await lastValueFrom(this._httpClient.put(this._path.path() + `chairCar/update`,model));
    }
    async getPriceInvoiceDetails(idInvoice : number,idChairCar: number, dateBook:string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `invoiceCarDetail/getPriceInvoiceDetails/`+idInvoice+'/'+idChairCar+'/'+dateBook));
    }
    async getDetailForCart(idAccount : number){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `invoiceCarDetail/getDetailForCart/`+idAccount));
    }
    async delete(idAccount : number,idChairCar : number){
        return await lastValueFrom(this._httpClient.delete(this._path.path() + `invoiceCarDetail/delete?idAccount=`+idAccount+'&idChairCar='+idChairCar));
    }
    
    

}