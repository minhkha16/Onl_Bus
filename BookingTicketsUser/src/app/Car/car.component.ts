import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { formatDate } from "@angular/common";
import { Timeapi } from "../Services/timeapi.service";
import { ActivatedRoute } from "@angular/router";
import { Carapi } from "../Services/carapi.service";
import { Categoryapi } from "../Services/categoryapi.service";
@Component({
    templateUrl: './car.component.html'
})

export class CarComponent implements OnInit {
    constructor(
       private timeService: Timeapi,
       private carService: Carapi,
       private categoryService: Categoryapi,
        private formBuilder: FormBuilder,
        private activatedRoute: ActivatedRoute
    ){}
    alltimes: any[]=[];
    allcars:any[] = [];
    allcatecars:any[] = [];
    result_search_bycate:any[]=[];
    id_freeway:number = 0;
    departing:string =''; 
    id_time_default:number=1;
    ngOnInit(): void {
        this.departing='';
        this.activatedRoute.paramMap.subscribe(params => {
            this.id_freeway =parseInt( params.get('id_freeway'));
            this.departing = params.get('departing').replaceAll('/','-');
            console.log(this.id_freeway);
            console.log(this.departing);
         });
        this.timeService.getAll().then(
            result => {
                this.alltimes = result as [];
                console.log(this.alltimes);
            },
            error => {
                console.log(error);
            }
        ); 
        this.categoryService.getAllCategory().then(
            result => {
                this.allcatecars = result as [];
                console.log(this.allcatecars);
            },
            error => {
                console.log(error);
            }
        ); 
        this.carService.getAllCar(1,this.id_freeway,this.departing).then(
            result => {
                this.allcars = result as [];
                console.log(this.allcars);
            },
            error => {
                console.log(error);
            }
        );   

       
    }
    chooseTime(id_time:any){
        this.id_time_default = id_time;
        // console.log(id_time);
        // console.log(this.id_freeway);
        // console.log(this.departing);
        this.carService.getAllCar(id_time,this.id_freeway,this.departing).then(
            result => {
                this.allcars = result as [];
                console.log(this.allcars);
            },
            error => {
                console.log(error);
            }
        );   
    }
    chooseCate(id_cate:any){
        console.log(this.id_time_default);
        this.carService.searchCarByCate( this.id_time_default,this.id_freeway,id_cate,this.departing).then(
            result => {
                this.allcars = result as [];
                console.log(this.allcars);
            },
            error => {
                console.log(error);
            }
        );   
    }
    
}