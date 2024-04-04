import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { CategoryCar } from "src/app/models/categoryCar";
import { CateService } from "src/app/services/cateService";


@Component({
    templateUrl: './list.component.html'
})

export class listCateComponent implements OnInit{
    constructor(
        private cateService: CateService
        ){}
        cates : CategoryCar[];
        ngOnInit(): void {
            this.cateService.list().then (
                res => {
                    this.cates = res as CategoryCar[];
                },err=>{
                    console.log(err);
                }
                
            )
        }
        
        delete(id: number){
            var rv = confirm(`Are you sure delete id ${id}`);
            if(rv){
            this.cateService.delete(id).then(
                res =>{
                    if(res){
                        alert("Sucsses!")
                        this.ngOnInit()
                    }
                },err =>console.log(err)
            )
            }
        }
}