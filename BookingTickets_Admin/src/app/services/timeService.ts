import { Injectable } from "@angular/core";
import { PathAdminService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { Car } from "../models/car.model";
import { lastValueFrom } from "rxjs";
import { TimeLine } from "../models/timeline.model";

@Injectable()

export class TimeService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}

    async add(time: TimeLine){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `timeline/addtimeline`, time));
    }
    async list(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'timeline/findAll'));
    }
    async edit(time: TimeLine){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + `timeline/editTimeLine`,time));
    }
    async getid(id:number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'timeline/getId?id='+id));
    }
    async delete(id:number){
        return await lastValueFrom(this._httpClient.delete(this._pathService.path() + 'timeline/deletetimeLine?id='+id));
    }
}