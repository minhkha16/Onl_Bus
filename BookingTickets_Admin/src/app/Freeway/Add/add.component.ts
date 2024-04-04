import { Component, OnInit } from "@angular/core";
import { Form, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FormTo } from "src/app/models/formto.model";
import { Freeway } from "src/app/models/freeway.model";
import { FreewaysService } from "src/app/services/freewaysService";
import { FromToService } from "src/app/services/fromtoService";

@Component({
    templateUrl: './add.component.html'
})

export class CreationFreewayComponent implements OnInit {
    constructor(
        private _freewayService: FreewaysService,
        private _FromToService: FromToService,
        private _formBuilder: FormBuilder,
        private _router: Router,
    ) {}

    freewayForm: FormGroup;

    placeTos: FormTo[];
    placeFroms: FormTo[];
    ngOnInit(): void {
        this._FromToService.listFrom().then(res=>{
            this.placeFroms = res as FormTo[];
        },er=>console.log(er))

        this._FromToService.listTo().then(res=>{
            this.placeTos = res as FormTo[];
        },er=>console.log(er))

        this.freewayForm = this._formBuilder.group({
            idFrom: "",
            idTo: "",
            price: [
                '',
                [
                    Validators.required,
                ],
                ],
        }) 
    }
    save(){
        var freeway: Freeway = this.freewayForm.value as Freeway;
        this._freewayService.add(freeway).then(
            res=>{
                console.log(res);
                alert("Success")
                this._router.navigate(['/listFreeway'])
            }, 
            er => {
                console.log(er)
            });
    }

    
}