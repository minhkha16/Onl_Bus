import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormTo } from "src/app/models/formto.model";
import { Freeway } from "src/app/models/freeway.model";
import { Resultapi } from "src/app/models/resultapi.model";
import { FreewaysService } from "src/app/services/freewaysService";
import { FromToService } from "src/app/services/fromtoService";

@Component({
    templateUrl: './edit.component.html'
})

export class EditFreewayComponent implements OnInit {
    constructor(
        private _freewayService: FreewaysService,
        private _FromToService: FromToService,
        private _formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
    ) {}
    
    editForm: FormGroup;
    id: number;
    
    placeTos: FormTo[];
    placeFroms: FormTo[];
    ngOnInit(): void {
        this._FromToService.listFrom().then(res=>{
            this.placeFroms = res as FormTo[];
        },er=>console.log(er))

        this._FromToService.listTo().then(res=>{
            this.placeTos = res as FormTo[];
        },er=>console.log(er))

        this._activatedRoute.paramMap.subscribe(assignment=>{
            this.id = parseInt(assignment.get('id'));
        })

        this._freewayService.getid(this.id).then(res=>{
            var freeway = res as Freeway;
            this.editForm = this._formBuilder.group({
                name: freeway.name,
                idFrom: freeway.idFrom,
                idTo: freeway.idTo,
                price: [
                    freeway.price,
                    [
                        Validators.required,
                    ],
                    ],
            })
            console.log(freeway);
        })
    }  
    
    update(){
        var freeway: Freeway = this.editForm.value as Freeway;
        freeway.id = Number(this.id);
        this._freewayService.edit(freeway).then(res=>{
            var rs = res as Resultapi;
            if(rs.status){
                alert('Failure');
            }else{
                alert('Succses');
                this._router.navigate(['/listFreeway'])
            }
        },er=>console.log(er))
    }
}