import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { CategoryCar } from "src/app/models/categoryCar";
import { CateService } from "src/app/services/cateService";

@Component({
    templateUrl: './add.component.html'
})

export class addCateComponent implements OnInit{
    constructor(
        private formBuilder: FormBuilder,
        private cateService: CateService,
        private _router: Router
    ){
    }
    addCate :FormGroup;
    
    ngOnInit(): void {
        this.addCate = this.formBuilder.group({
            name: [
                '',
                [
                    Validators.required,
                ],
                ],
        });
    }
    save(){
        var cate =  this.addCate.value as CategoryCar;
        this.cateService.add(cate).then(res => {
            alert("Success!")
            this._router.navigate(['/listCate'])
        },err => console.log(err)
        )
    }
}