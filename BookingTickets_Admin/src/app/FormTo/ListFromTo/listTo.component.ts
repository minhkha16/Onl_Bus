import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FormTo } from "src/app/models/formto.model";
import { FromToService } from "src/app/services/fromtoService";

@Component({
    templateUrl: './listFormTo.component.html'
})

export class ListToComponent implements OnInit{
    constructor(
        private formtoService : FromToService
    ){}
    a:boolean;
    formtos : FormTo[];
    ngOnInit(): void {
       this.formtoService.listTo().then(
        res =>{
            this.formtos = res as FormTo[];
        }
       )
       this.a = true;
    }
    
}