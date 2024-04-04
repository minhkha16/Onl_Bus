import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryCar } from "src/app/models/categoryCar";
import { Resultapi } from "src/app/models/resultapi.model";
import { Shipping } from "src/app/models/shipping.model";
import { CateService } from "src/app/services/cateService";
import { ShippingService } from "src/app/services/shippingService";


@Component({
    templateUrl: './edit.component.html'
})

export class editShippingComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private _shippingService: ShippingService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
    ){
    }
    editShipping :FormGroup;
    a: Shipping;
    id: number;
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe(assignment=>{
            this.id = parseInt(assignment.get('id'));
        })

        this._shippingService.getid(this.id).then(res=>{
            var ship = res as Shipping;
            this.editShipping = this._formBuilder.group({
                pakage: [
                    ship.pakAge,
                    [
                        Validators.required,
                    ],
                    ],
                price: [
                    ship.price,
                    [
                        Validators.required,
                    ],
                    ],
                weight: [
                    ship.weight,
                    [
                        Validators.required,
                    ],
                    ],
            })
        })
    }

    update(){
        var ship: Shipping = this.editShipping.value as Shipping;
        ship.id = Number(this.id);
        this._shippingService.edit(ship).then(res=>{
            var rs = res as Resultapi;
            if(rs.status){
                alert('Failure');
            }else{
                alert('Succses');
                this._router.navigate(['/listShipping'])
            }
        },er=>console.log(er))
    }
}