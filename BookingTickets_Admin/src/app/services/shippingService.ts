import { Injectable } from "@angular/core";
import { PathAdminService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { CategoryCar } from "../models/categoryCar";
import { Shipping } from "../models/shipping.model";

@Injectable()

export class ShippingService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}

    async add(shipping: Shipping){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `shipping/add`, shipping));
    }
    async list(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'shipping/findAll'));
    }
    async edit(shipping: Shipping){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + `shipping/edit`,shipping));
    }
    async getid(id:number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'shipping/find?id='+id));
    }
    async delete(id:number){
        return await lastValueFrom(this._httpClient.delete(this._pathService.path() + 'shipping/delete?id='+id));
    }
}