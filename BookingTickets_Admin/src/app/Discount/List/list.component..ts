import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoryCar } from "src/app/models/categoryCar";
import { Discount } from "src/app/models/discountApi.model";
import { Shipping } from "src/app/models/shipping.model";
import { CateService } from "src/app/services/cateService";
import { DiscountService } from "src/app/services/discountService";
import { ShippingService } from "src/app/services/shippingService";


@Component({
    templateUrl: './list.component.html'
})

export class listDiscountComponent implements OnInit{
    constructor(
        private _discountService: DiscountService, 
        private _router: Router,
        ){}
        discounts : Discount[];
        ngOnInit(): void {
            this._discountService.getAllDis().then (
                res => {
                    this.discounts = res as Discount[];
                },err=>{
                    console.log(err);
                }
                
            )
        }
        
        delete(id: number){
            var rv = confirm(`Are you sure delete id ${id}`);
            if(rv){
            this._discountService.delete(id).then(
                res =>{
                    if(res){
                        alert("Sucsses!")
                        this._router.navigate(['/listDiscount']);
                    }
                },err =>console.log(err)
            )
            }
        }
}