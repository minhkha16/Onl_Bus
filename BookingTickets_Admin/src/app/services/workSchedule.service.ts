import { Injectable } from "@angular/core";
import { PathAdminService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { Car } from "../models/car.model";
import { lastValueFrom } from "rxjs";
import { TimeLine } from "../models/timeline.model";
import { WorkSchedule } from "../models/workschedule.model";
import { Chaircar } from "../models/chaircar.model";

@Injectable()

export class WorkScheduleService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}

    async add(word: WorkSchedule){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `workschedules/addword`, word));
    }
    
    async list(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'workschedules/findAll'));
    }
    async listcar(car:string){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'workschedules/findCar?id='+car));
    }
    async edit(word: WorkSchedule){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + 'workschedules/editword',word));
    }
    async getid(id:number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'workschedules/getId?id='+id));
    }
    async getworkday(a:string){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + 'workschedules/search?date='+a));
    }
}