import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { FormTo } from "src/app/models/formto.model";
import { FromToService } from "src/app/services/fromtoService";

@Component({
    templateUrl: './addFormTo.component.html'
})

export class addFormToComponent implements OnInit{
    constructor(
        private formBuilder: FormBuilder,
        private fromtoService: FromToService,
        private _router: Router
    ){
    }
    fromto :FormGroup;
    ngOnInit(): void {
        this.fromto = this.formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                ],
                ],
        });
    }
    save(){
        var a  = this.fromto.value as FormTo;
        this.fromtoService.addTo(a).then(
            res =>{
                alert("Success!")
                this._router.navigate(['/listfrom'])
            },err =>{
                console.log(err);
            }
        )
        
        this.fromtoService.addFrom(a).then(
            resl =>{
              if(resl){
                this.ngOnInit();
              }
            }
        )
    }
}