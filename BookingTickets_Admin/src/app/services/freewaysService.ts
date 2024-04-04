import { Injectable } from "@angular/core";
import { PathAdminService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { Car } from "../models/car.model";
import { lastValueFrom } from "rxjs";
import { TimeLine } from "../models/timeline.model";
import { Freeway } from "../models/freeway.model";

@Injectable()

export class FreewaysService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}

    async add(freeway: Freeway){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `freeway/add`, freeway));
    }
    async list(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `freeway/findAll`));
    }
    async edit(freeway: Freeway){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + `freeway/edit`,freeway));
    }
    async getid(id:number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `freeway/find?id=${id}`));
    }
    async delete(id: number){
        return await lastValueFrom(this._httpClient.delete(this._pathService.path() + `freeway/delete?id=${id}`))
    }
}