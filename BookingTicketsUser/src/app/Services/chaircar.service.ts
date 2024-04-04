import { Injectable } from "@angular/core";
import { PathService } from "./path.service";
import { HttpClient } from "@angular/common/http";
import { lastValueFrom } from "rxjs";
import { ChairCarModel } from "../Models/chaircar.model";

@Injectable()

export class IChairCarService {
    getIdCarAndIdTimeLine(idCar: string, idTimeLine: number) {
        throw new Error("Method not implemented.");
    }
    constructor(private _path : PathService,
        private _httpClient : HttpClient){}
    
    async Creation(model : ChairCarModel){
        return await lastValueFrom(this._httpClient.post(this._path.path() + `chairCar/creation`,model));
    }

    async ViewAll(){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `chairCar/index`));
    }



    async Update(model : ChairCarModel){
        return await lastValueFrom(this._httpClient.put(this._path.path() + `chairCar/update`,model));
    }

    async getByIdChairAndIdCarAndDateBook(idChair : number, idCar : string,dateBook : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `chairCar/getByIdChairAndIdCarAndDateBook/${idChair}/${idCar}/${dateBook}`));
    }

    async getByIdCar(idCar : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `chairCar/getByIdCar/${idCar}`));
    }
    async getById(idChairCar : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `chairCar/getById/${idChairCar}`));
    }
    async getIdChairCar(idChair:number,idCar : string,idTimeLine:number){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `chairCar/getIdChairCar/`+idChair+'/'+idCar+'/'+idTimeLine));
    }
    async checkSubject(idChair:number,idCar : string,idTimeLine:number){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `chairCar/checkSubject/`+idChair+'/'+idCar+'/'+idTimeLine));
    }

    async getIdCarAndIdTimeLineAndDateBook(idCar : string, idTimeLine : number,date : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `chairCar/GetByIdCarAndIdTimeLineAndDateBook/${idCar}/${idTimeLine}/${date}`));
    }

    async countTheChairAvailable(idCar : string, idTimeLine : number,date : string){
        return await lastValueFrom(this._httpClient.get(this._path.path() + `chairCar/countTheChairAvailable/${idCar}/${idTimeLine}/${date}`));
    }
}