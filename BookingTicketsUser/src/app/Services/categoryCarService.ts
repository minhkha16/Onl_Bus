import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PathService } from "./path.service";
import { lastValueFrom } from "rxjs";
import { CategoryCar } from "../Models/categoryCar.model";

@Injectable()

export class CategoryCarService{
    constructor(private _pathService: PathService,private _httpClient: HttpClient){}

    async getAllCategoryCar(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'categoryCar/findAll'));
    }

    async addCategoryCar(categoryCar: CategoryCar){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `categoryCar/add`, categoryCar));
    }

    async findById(id: number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `categoryCar/find/${id}`));
    }

    async delete(id: number){
        return await lastValueFrom(this._httpClient.delete(this._pathService.path() + `categoryCar/delete/${id}`))
    }
}