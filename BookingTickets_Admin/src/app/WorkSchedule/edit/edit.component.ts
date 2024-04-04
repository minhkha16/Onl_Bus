import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
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
    templateUrl: './edit.component.html'
})

export class editWorkComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private carService: CarService,
        private timeLineService: TimeService,
        private accountService: AccountService,
        private router: Router,
        private freewayService: FreewaysService,
        private worksheduleService: WorkScheduleService,
        private _activatedRoute: ActivatedRoute,
    ){
    }
    editWorkForm :FormGroup;
    cars :Car[];
    timelines :TimeLine[];
    accounts :Account[];
    freeways : Freeway[];
    id:number;
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe(assignment=>{
            this.id = parseInt(assignment.get('id'));
        })
        this.worksheduleService.getid(this.id).then(
            res=>{
                var a = res as WorkSchedule;
                this.editWorkForm = this._formBuilder.group({
                    workDay : a.workDay,
                    idTimeLine : a.idTimeLine,
                    idFreeWay : a.idFreeWay,
                    idAccount : a.idAccount,
                    idCar : a.idCar,
                })
                console.log(a)
            }
        )
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
        
        
    }

    update(){
        var c  = this.editWorkForm.value as WorkSchedule;
        c.id = this.id;
        c.workDay = formatDate(c.workDay,'dd/MM/yyyy', 'en-US');
        console.log(c);
        this.worksheduleService.edit(c).then(
            res =>{
                if(res){
                    console.log(res);
                    this.router.navigate(['/listWork'])
                }
            },err=>console.log(err)
        )
    }
}