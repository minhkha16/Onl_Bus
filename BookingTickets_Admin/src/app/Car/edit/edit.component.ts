import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Car } from "src/app/models/car.model";
import { CategoryCar } from "src/app/models/categoryCar";
import { CarService } from "src/app/services/CarService";
import { CateService } from "src/app/services/cateService";

@Component({
    templateUrl: './edit.component.html'
})

export class editCarComponent implements OnInit{
    constructor(
        private carService: CarService,
        private _formBuilder: FormBuilder,
        private router: Router,
        private _activatedRoute: ActivatedRoute,
        private cateService: CateService
    ){
    }
    id:string;
    idCar:string;
    editCarForm :FormGroup;
    cates: CategoryCar[];
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe(assignment=>{
            this.id = assignment.get('id');
        })
        this.carService.getid(this.id).then(res=>{
            var c = res as Car;
           console.log(c);
            this.editCarForm = this._formBuilder.group({
                idCategory: c.idCategory,
                registrationDate : c.registrationDate,
                nameCar : c.nameCar,
            })
        })
        this.cateService.list().then (
            res => {
                this.cates = res as CategoryCar[];
            },err=>{
                console.log(err);
            }
            
        )
    }

    update(){
        var a = this.editCarForm.value  as Car;
        a.licensePlates = this.id;
        a.registrationDate =  formatDate(a.registrationDate,'dd/MM/yyyy', 'en-US')
        this.carService.update(a).then(res=>{
            alert("Susses!")
            this.router.navigate(['/listCar'])
        })
    }
}