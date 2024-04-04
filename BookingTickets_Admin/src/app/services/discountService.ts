import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { PathAdminService } from "./path.service";
import { Discount } from "../models/discountApi.model";




@Injectable()

export class DiscountService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}
    async addDis(discount: Discount){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `discount/addDis`, discount));
    }

    async getAllDis(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'discount/findAll'));
    }

    async findByContent(content: string){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `discount/find/${content}`));
    }

    async updateDis(Discount: Discount){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + `discount/edit`,Discount));
    }

    async delete(id: number){
        return await lastValueFrom(this._httpClient.delete(this._pathService.path() + `discount/delete/${id}`))
    }

    async findById(id: number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `discount/getid/${id}`));
    }
}