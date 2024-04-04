import { Injectable } from "@angular/core";
import { PathAdminService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { Car } from "../models/car.model";
import { lastValueFrom } from "rxjs";
import { TimeLine } from "../models/timeline.model";
import { FormTo } from "../models/formto.model";

@Injectable()

export class FromToService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}

    async addTo(to: FormTo){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `placeto/addplaceTo`, to));
    }
    async addFrom(from: FormTo){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `placefrom/addplacefrom`, from));
    }
    async listTo(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'placeto/findAll'));
    }
    async listFrom(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'placefrom/findAll'));
    }
    
    async getidFrom(id:number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'placefrom/getId?id='+id));
    }
    async getidTo(id:number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'placeto/getId?id='+id));
    }
    async updateTo(to: FormTo){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + `placeto/editplaceTo`, to));
    }
    async updateFrom(from: FormTo){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + `placefrom/editplacefrom`, from));
    }
}