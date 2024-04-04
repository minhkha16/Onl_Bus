import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CategoryCar } from "src/app/models/categoryCar";
import { Shipping } from "src/app/models/shipping.model";
import { CateService } from "src/app/services/cateService";
import { ShippingService } from "src/app/services/shippingService";


@Component({
    templateUrl: './list.component.html'
})

export class listShippingComponent implements OnInit{
    constructor(
        private _shipService: ShippingService,
        ){}
        shippings : Shipping[];
        ngOnInit(): void {
            this._shipService.list().then (
                res => {
                    this.shippings = res as Shipping[];
                },err=>{
                    console.log(err);
                }
                
            )
        }
        
        delete(id: number){
            var rv = confirm(`Are you sure delete id ${id}`);
            if(rv){
            this._shipService.delete(id).then(
                res =>{
                    if(res){
                        alert("Sucsses!")
                        this.ngOnInit()
                    }
                },err =>console.log(err)
            )
            }
        }
}