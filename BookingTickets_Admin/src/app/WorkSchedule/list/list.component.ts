import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Wor } from "src/app/models/wor.model";
import { WorkSchedule } from "src/app/models/workschedule.model";
import { WorkScheduleService } from "src/app/services/workSchedule.service";

@Component({
    templateUrl: './list.component.html'
})

export class listWorkComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private workScheduleService: WorkScheduleService,
        private router: Router
    ){
    }
    works: WorkSchedule[] = [];
    sea:FormGroup;
    ngOnInit(): void {
        this.workScheduleService.list().then(
            res =>{
                this.works = res as WorkSchedule[];
                console.log(this.works);
            }
        )
        this.sea = this._formBuilder.group({
            search :""
        })
    }
    searchday(){
        if(this.sea != null){
            var a = this.sea.value as Wor;
        a.search = formatDate(a.search,'dd/MM/yyyy', 'en-US');
        this.workScheduleService.getworkday(a.search).then(
            res =>{
                this.works = res as WorkSchedule[];
                console.log(this.works);
            }
        )
        }
        
    }
    
}