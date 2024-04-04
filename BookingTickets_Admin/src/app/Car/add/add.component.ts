import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Car } from "src/app/models/car.model";
import { CategoryCar } from "src/app/models/categoryCar";
import { CarService } from "src/app/services/CarService";
import { CateService } from "src/app/services/cateService";

@Component({
    templateUrl: './add.component.html'
})

export class addCarComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private _carService: CarService,
        private cateService: CateService,
        private _router: Router
    ){
    }
    cates: CategoryCar[];
    carForm :FormGroup;
    ngOnInit(): void {
        this.carForm = this._formBuilder.group({
            nameCar: "",
            licensePlates: "",
            idCategory:1,
            registrationDate: "",
        });
        this.cateService.list().then (
            res => {
                this.cates = res as CategoryCar[];
            },err=>{
                console.log(err);
            }
            
        )
    }

    save(){
        var car:Car = this.carForm.value as Car;
        console.log(car);
        car.registrationDate = formatDate(car.registrationDate,'dd/MM/yyyy', 'en-US')
        this._carService.add(car).then(
            res => {
                alert("Succses!")
                this._router.navigate(['/listCar'])
        }, err => {
            console.log(err);
        }
        )
    }
}