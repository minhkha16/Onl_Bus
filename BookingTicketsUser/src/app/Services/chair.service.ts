import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";

@Injectable()

export class IChairService{
    constructor(private _path: PathService,
        private _httpClient : HttpClient){}

    async getAll(){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `chair/getAll`));
    }

    
}