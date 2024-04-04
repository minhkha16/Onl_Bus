import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PathService } from "./path.service";
import { Car } from "../Models/car.model";
import { lastValueFrom } from "rxjs";

@Injectable()

export class CarService{
    constructor(private _pathService: PathService,private _httpClient: HttpClient){}

    async getAllCar(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'car/findAll'));
    }

    async addCar(car: Car){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `car/add`, car));
    }

    async findById(id: number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `car/find/${id}`));
    }

    async delete(id: number){
        return await lastValueFrom(this._httpClient.delete(this._pathService.path() + `car/delete/${id}`))
    }
}