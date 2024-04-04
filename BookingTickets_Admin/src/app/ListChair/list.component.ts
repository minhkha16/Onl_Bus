import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Shipping } from "src/app/models/shipping.model";
import { ShippingService } from "src/app/services/shippingService";
import { ListChairService } from "../services/listchair.service";
import { ListChair } from "../models/listchair.model";

@Component({
    templateUrl: './list.component.html'
})

export class ListChairComponent implements OnInit{
    constructor(
        private formBuilder: FormBuilder,
        private listChair: ListChairService,
        private _router: Router
    ){
    }
    lists : ListChair[];
    ngOnInit(): void {
       this.listChair.ListChair().then(res=>{
         this.lists = res as ListChair[]
       })
    }
    
}