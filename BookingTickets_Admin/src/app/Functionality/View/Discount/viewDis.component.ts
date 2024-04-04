import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Discount } from "src/app/models/discountApi.model";
import { Resultapi } from "src/app/models/resultapi.model";
import { DiscountService } from "src/app/services/discountService";


@Component({
    templateUrl: './viewDis.component.html'
})

export class ViewDisComponent implements OnInit {
    constructor(
        private _DiscountService: DiscountService,
        private _formBuilder: FormBuilder,
    ) {}
    discounts: Discount[];
    ngOnInit(): void {
        this._DiscountService.getAllDis().then(
            res=>{
                this.discounts = res as Discount[];
            },
                er=>console.log(er)           
            );
    }

    delete(id: number){
        var rv = confirm(`Are u certain delete discount have id is : ${id}`);
        if(rv){
            this._DiscountService.delete(id).then(res=>{
                var rs = res as Resultapi;
                if(rs.status){
                    this.ngOnInit();
                    alert("Susses");
                }else{
                    alert("False");
                }
            });
        }
    }
}