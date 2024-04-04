import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Discount } from "src/app/models/discountApi.model";
import { Shipping } from "src/app/models/shipping.model";
import { DiscountService } from "src/app/services/discountService";
import { ShippingService } from "src/app/services/shippingService";

@Component({
    templateUrl: './add.component.html'
})

export class addDiscountComponent implements OnInit{
    constructor(
        private formBuilder: FormBuilder,
        private _discountService: DiscountService,
        private _router: Router
    ){
    }
    discountFrom :FormGroup;
    
    ngOnInit(): void {
        this.discountFrom = this.formBuilder.group({
            price: [
                '',
                [
                    Validators.required,
                ],
                ],
            content: [
                '',
                [
                    Validators.required,
                ],
                ],
            dateEnd: [
                '',
                [
                    Validators.required,
                ],
                ],
            status: true
        });
    }
    save(){
        var dis =  this.discountFrom.value as Discount;
        dis.dateEnd = formatDate(dis.dateEnd,'dd/MM/yyyy', 'en-US')

        this._discountService.addDis(dis).then(res => {
            alert("Success!")
            this._router.navigate(['/listDiscount'])
        },err => console.log(err)
        )
    }
}