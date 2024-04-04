import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { Freeway } from "src/app/models/freeway.model";
import { Resultapi } from "src/app/models/resultapi.model";
import { FreewaysService } from "src/app/services/freewaysService";

@Component({
    templateUrl: './view.component.html'
})

export class ViewFreewayComponent implements OnInit {
    constructor(
        private _freewayService: FreewaysService,
        private _formBuilder: FormBuilder,
        private _router: Router,
    ) {}
    freeways: Freeway[];
    ngOnInit(): void {
        this._freewayService.list().then(
            res=>{
               
                this.freeways = res as Freeway[]; console.log(this.freeways);
            },
                er=>console.log(er)           
            );
    }

    delete(id: number){
        var rv = confirm(`Are u certain delete freeway have id is : ${id}`);
        if(rv){
            this._freewayService.delete(id).then (
                res => {
                    alert("Succses")
                    this.ngOnInit();
                },err=>{
                    console.log(err);
                }
            )
        }
    }
}