import { Injectable } from "@angular/core";
import { PathAdminService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { Car } from "../models/car.model";
import { lastValueFrom } from "rxjs";

@Injectable()

export class CarService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}

    async add(car: Car){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `car/addcar`, car));
    }
    async list(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `car/findallcar`));
    }
    async getid(id:string){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `car/getid?id=`+id));
    }
    async update(car: Car){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + `car/editcar`,car));
    }
}