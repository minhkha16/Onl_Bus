import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { FormTo } from "src/app/models/formto.model";
import { FromToService } from "src/app/services/fromtoService";

@Component({
    templateUrl: './editFormTo.component.html'
})

export class EditFromComponent implements OnInit{
    constructor(
        private formBuilder: FormBuilder,
        private fromtoService: FromToService,
        private _activatedRoute: ActivatedRoute,
        private router: Router
    ){
    }
    c:boolean;
    id:number;
    editFromTo :FormGroup;
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe(assignment=>{
            this.id = parseInt(assignment.get('id'));
        })
        this.fromtoService.getidFrom(this.id).then( res=>{
            var a = res as FormTo;
            this.editFromTo = this.formBuilder.group({
                name :a.name
            });
        })
        this.c = false;
    }
    update(){
        var from = this.editFromTo.value as FormTo;
        from.id = this.id;
        this.fromtoService.updateFrom(from).then(
            res=>{
                this.router.navigate(['listfrom']);
            }
        )
    }
}