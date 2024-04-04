import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoryCar } from "src/app/models/categoryCar";
import { Resultapi } from "src/app/models/resultapi.model";
import { CateService } from "src/app/services/cateService";


@Component({
    templateUrl: './edit.component.html'
})

export class editCateComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private _categoryService: CateService,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
    ){
    }
    editCateForm :FormGroup;
    a: CategoryCar;
    id: number;
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe(assignment=>{
            this.id = parseInt(assignment.get('id'));
        })

        this._categoryService.getid(this.id).then(res=>{
            var cate = res as CategoryCar;
            this.editCateForm = this._formBuilder.group({
                name: [
                    cate.name,
                    [
                        Validators.required,
                    ],
                    ],
            })
        })
    }

    update(){
        var cate: CategoryCar = this.editCateForm.value as CategoryCar;
        cate.id = Number(this.id);
        this._categoryService.edit(cate).then(res=>{
            var rs = res as Resultapi;
            if(rs.status){
                alert('Failure');
            }else{
                alert('Succses');
                this._router.navigate(['/listCate'])
            }
        },er=>console.log(er))
    }
}