import { Injectable } from "@angular/core";
import { PathAdminService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { Car } from "../models/car.model";
import { lastValueFrom } from "rxjs";
import { Account } from "../models/account.model";

@Injectable()

export class AccountService{
    constructor(private _pathService: PathAdminService,private _httpClient: HttpClient){}

    async add(acc: Account){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `account/add`, acc));
    }
    async Login(acc: Account){
        return await lastValueFrom(this._httpClient.post(this._pathService.path() + `account/login`,acc));
    }
    async List(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `account/findAll`));
    }
    async Edit(acc: Account){
        return await lastValueFrom(this._httpClient.put(this._pathService.path() + `account/edit`,acc));
    }
    async Getid(id: number){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `account/getid?id=`+id));
    }
    async ListDrive(){
        return await lastValueFrom(this._httpClient.get(this._pathService.path() + `account/finddrive`));
    }
}