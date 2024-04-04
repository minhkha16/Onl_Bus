import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { lastValueFrom } from "rxjs";

@Injectable()

export class Carapi{
    constructor(
        private pathService: PathService,
        private httpClient: HttpClient
    ){}
    async getAllCar(id_time:number,id_freeway:number,departing:string) {   
        return await lastValueFrom(this.httpClient.get(this.pathService.path() + 'car/getAllCar/'+id_time+'/'+id_freeway+'/'+departing));
    }
    async searchCarByCate(id_time:number,id_freeway:number,id_cate:number,departing:string) {   
        return await lastValueFrom(this.httpClient.get(this.pathService.path() + 'car/searchCarByCate/'+id_time+'/'+id_freeway+'/'+id_cate+'/'+departing));
    }
}
