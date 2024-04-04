import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { WorkScheduleModel } from "../Models/workschedule.model";

@Injectable()

export class IWorkScheduleService {
    constructor(private _pathService : PathService,
        private _httpClient: HttpClient){}

    async getWorkSchedule(idAccount : number, status : string) {
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `workschedule/worksheduleByIdAccount/${idAccount}/${status}`)); 
    }

    async GetById(idAccount : number) {
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `workschedule/getById/${idAccount}`)); 
    }

    async update(model: WorkScheduleModel){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `workschedule/update`, model)); 
    }

    async addWorkSchedules(model: WorkScheduleModel){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `workschedule/addWorkSchedules`, model)); 
    }

    async getWorkScheduleCompleted(idAccount : number, status : string) {
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `workschedule/getByStatusCompleted/${idAccount}/${status}`)); 
    }

    async getByIdAccount(idAccount : number) {
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `workschedule/getByIdAccount/${idAccount}`)); 
    }

    async Search(date : string, time : number, freeway : number) {
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `workschedule/search/${date}/${time}/${freeway}`)); 
    }

    async getByIdAccountAndStatusAndDateBook(idAccount : number, status : string, dateBook : string){
        return await lastValueFrom(this._httpClient.get(
            this._pathService.path() + `workschedule/getByIdAccountAndStatusAndDateBook/${idAccount}/${status}/${dateBook}`)); 

    }
}