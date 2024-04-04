import { Time, formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/models/account.model";
import { Car } from "src/app/models/car.model";
import { Chaircar } from "src/app/models/chaircar.model";
import { Freeway } from "src/app/models/freeway.model";
import { TimeLine } from "src/app/models/timeline.model";
import { WorkSchedule } from "src/app/models/workschedule.model";
import { CarService } from "src/app/services/CarService";
import { AccountService } from "src/app/services/account.service";
import { FreewaysService } from "src/app/services/freewaysService";
import { TimeService } from "src/app/services/timeService";
import { WorkScheduleService } from "src/app/services/workSchedule.service";

@Component({
    templateUrl: './add.component.html'
})

export class addWorkComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private carService: CarService,
        private timeLineService: TimeService,
        private accountService: AccountService,
        private router: Router,
        private freewayService: FreewaysService,
        private worksheduleService: WorkScheduleService
    ){
    }
    cars :Car[];
    timelines :TimeLine[];
    accounts :Account[];
    workForm :FormGroup;
    freeways : Freeway[];
    chaircar: Chaircar;
    ngOnInit(): void {
        this.workForm = this._formBuilder.group({
            workDay : "",
            idTimeLine : "",
            idFreeWay : "",
            idAccount : "",
            idCar : "",
            status : "",
        });
        this.carService.list().then(
            res=>{
                this.cars = res as Car[];
            }
        )
        this.timeLineService.list().then(
            res=>{
                this.timelines = res as TimeLine[];
            }
        )
        this.accountService.ListDrive().then(
            res=> {
                this.accounts = res as Account[];
            }
        )
        this.freewayService.list().then(
            res=>{
                this.freeways = res as Freeway[];
            }
        )
        // this.chaircar.idCar ="";
        // this.chaircar.idTimeLine = 1;
    }

    save(){
        var wor = this.workForm.value as WorkSchedule;
        wor.workDay = formatDate(wor.workDay,'dd/MM/yyyy', 'en-US');
        console.log(wor);
        this.worksheduleService.add(wor).then(
            res=>{
                alert("Succses!")
                this.router.navigate(['/listWork'])
            },err=>console.log(err)
        );
        
    }
}