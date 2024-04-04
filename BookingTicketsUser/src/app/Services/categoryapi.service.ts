import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { lastValueFrom } from "rxjs";

@Injectable()

export class Categoryapi{
    constructor(
        private pathService: PathService,
        private httpClient: HttpClient
    ){}
    async getAllCategory() {   
        return await lastValueFrom(this.httpClient.get(this.pathService.path() + 'categoryCar/getAllCategory'));
    }
  
    
}
