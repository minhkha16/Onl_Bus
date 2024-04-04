import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryCar } from "src/app/models/categoryCar";
import { Discount } from "src/app/models/discountApi.model";
import { Resultapi } from "src/app/models/resultapi.model";
import { Shipping } from "src/app/models/shipping.model";
import { CateService } from "src/app/services/cateService";
import { DiscountService } from "src/app/services/discountService";
import { ShippingService } from "src/app/services/shippingService";


@Component({
    templateUrl: './edit.component.html'
})

export class editDiscountComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private _discountService: DiscountService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
    ){
    }
    editDiscount :FormGroup;
    a: Discount;
    id: number;
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe(assignment=>{
            this.id = parseInt(assignment.get('id'));
        })

        this._discountService.findById(this.id).then(res=>{
            var dis = res as Discount;
            this.editDiscount = this._formBuilder.group({
                content: [
                    dis.content,
                    [
                        Validators.required,
                    ],
                    ],
                price: [
                    dis.price,
                    [
                        Validators.required,
                    ],
                    ],
                dateEnd: [
                    dis.dateEnd,
                    [
                        Validators.required,
                    ],
                    ],
            })
        })
    }

    update(){
        var dis: Discount = this.editDiscount.value as Discount;
        dis.id = Number(this.id);
        this._discountService.updateDis(dis).then(res=>{
            var rs = res as Resultapi;
            if(rs.status){
                alert('Failure');
            }else{
                alert('Succses');
                this._router.navigate(['/listDiscount'])
            }
        },er=>console.log(er))
    }
}