import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { lastValueFrom } from "rxjs";

@Injectable()

export class DiscountService {
    constructor(
        private pathService: PathService,
        private httpClient: HttpClient
    ){}
    async getByCode(idAccount:number, code:string){   
        return await lastValueFrom(this.httpClient.get(this.pathService.path() + 'discount/getByCode/'+idAccount+'/'+code));
    }
  
    
}
