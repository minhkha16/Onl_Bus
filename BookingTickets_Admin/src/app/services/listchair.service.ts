import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { PathAdminService } from "./path.service";
import { InvoiceShipping } from "../models/invoiceShipping.model";

@Injectable()

export class ListChairService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}

    async ListChair(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'listchair/list'));
    }

}