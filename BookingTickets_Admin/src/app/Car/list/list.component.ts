import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Car } from "src/app/models/car.model";
import { CarService } from "src/app/services/CarService";

@Component({
    templateUrl: './list.component.html'
})

export class listCarComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private carService: CarService
    ){
    }
    cars: Car[];
    ngOnInit(): void {
        this.carService.list().then (
            res => {
                this.cars = res as Car[];
            },err=>{
                console.log(err);
            }
            
        )
    }

    delete(idCategory: string){
        
    }
}