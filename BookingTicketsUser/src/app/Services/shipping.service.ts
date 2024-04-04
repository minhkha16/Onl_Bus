import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable()

export class ShippingService{
    constructor(private _path : PathService,private _httpClient: HttpClient){}
    async GetByPakage(pakage: string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `shipping/findby?pakage=${pakage}`));
    }

    async getAllShipping(){
        return await lastValueFrom(this._httpClient.get(this._path.path() + 'shipping/findAll'));
    }

    async GetById(id : number) {
        return await lastValueFrom(this._httpClient.get(this._path.path() + `shipping/findByPrice/${id}`)); 
    }
}
