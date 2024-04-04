import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { lastValueFrom } from "rxjs";

@Injectable()

export class PlaceFromapi{
    constructor(
        private pathService: PathService,
        private httpClient: HttpClient
    ){}
    async getAllPlaceFrom() {   
        return await lastValueFrom(this.httpClient.get(this.pathService.path() + 'freeway/getAllPlaceFrom'));
    }
    async getAllFreeway() {   
        return await lastValueFrom(this.httpClient.get(this.pathService.path() + 'freeway/getAllFreeway'));
    }
    async getPlaceTo(id_placefrom:number) {   
        return await lastValueFrom(this.httpClient.get(this.pathService.path() + 'freeway/getPlaceTo/'+id_placefrom));
    }
    async checkFreeWay(id_placefrom:number,id_placeto:number,departing:string) {   
        return await lastValueFrom(this.httpClient.get(this.pathService.path() + 'freeway/checkFreeWay/'+id_placefrom+'/'+id_placeto+'/'+departing));
    }
    async getPopularFreewaybyIdPlacefrom(id_placefrom:number) {   
        return await lastValueFrom(this.httpClient.get(this.pathService.path() + 'freeway/getPopularFreewaybyIdPlacefrom/'+id_placefrom));
    }
    
}
