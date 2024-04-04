import { Injectable } from "@angular/core";
import { PathAdminService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { Car } from "../models/car.model";
import { lastValueFrom } from "rxjs";
import { TimeLine } from "../models/timeline.model";
import { CategoryCar } from "../models/categoryCar";

@Injectable()

export class CateService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}

    async add(cate: CategoryCar){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `category/addcate`, cate));
    }
    async list(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'category/findall'));
    }
    async edit(Category: CategoryCar){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + `category/editcate`,Category));
    }
    async getid(id:number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'category/getid?id='+id));
    }
    async delete(id:number){
        return await lastValueFrom(this._httpClient.delete(this._pathService.path() + 'category/deletecate?id='+id));
    }
}