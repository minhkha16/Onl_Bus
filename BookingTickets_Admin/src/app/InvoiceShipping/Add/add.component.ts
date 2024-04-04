import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Shipping } from "src/app/models/shipping.model";
import { ShippingService } from "src/app/services/shippingService";

@Component({
    templateUrl: './add.component.html'
})

export class addShippingComponent implements OnInit{
    constructor(
        private formBuilder: FormBuilder,
        private _shippingService: ShippingService,
        private _router: Router
    ){
    }
    shippingForm :FormGroup;
    
    ngOnInit(): void {
        this.shippingForm = this.formBuilder.group({
            pakAge: [
                '',
                [
                    Validators.required,
                ],
                ],
            price: [
                '',
                [
                    Validators.required,
                ],
                ],
            weight: [
                '',
                [
                    Validators.required,
                ],
                ],
        });
    }
    save(){
        var cate =  this.shippingForm.value as Shipping;
        this._shippingService.add(cate).then(res => {
            alert("Success!")
            this._router.navigate(['/listShipping'])
        },err => console.log(err)
        )
    }
}