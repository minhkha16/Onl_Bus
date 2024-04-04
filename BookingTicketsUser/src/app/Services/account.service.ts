import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { AccountModel } from "../Models/account.model";

@Injectable()

export class IAccountService{
    constructor(private _path: PathService,
        private _httpClient: HttpClient){}

    async getAccounts(){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `account/getAll`));
    }

    async Creation(model : AccountModel){
        return await lastValueFrom(this._httpClient.post(this._path.path() + `account/creation`,model));
    }

    async Update(model : AccountModel){
        return await lastValueFrom(this._httpClient.post(this._path.path() + `account/update`,model));
    }
    
    async Login(email : string, password : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `account/login/${email}/${password}`));
    }

    async getByEmail(email : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `account/getByEmail/${email}`));
    }

    async CheckEmailExists(email : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `account/checkExists/${email}`));
    }

    async Quantyti(code : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `discount/getByCode/${code}`));
    }

    async checkStatus(email : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `account/checkStatus/${email}`));
    }

    async ChangePasswordWithCurrentPassword(email : string, currentPassword : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `account/changePasswordWithCurrentPassword/${email}/${currentPassword}`));
    }
}