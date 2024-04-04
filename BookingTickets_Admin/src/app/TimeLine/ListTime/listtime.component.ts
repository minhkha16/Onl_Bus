import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { TimeLine } from "src/app/models/timeline.model";
import { TimeService } from "src/app/services/timeService";


@Component({
    templateUrl: './listtime.component.html'
})

export class ListTimeComponent implements OnInit{

   constructor(
    private timeService: TimeService
   ){}
    times : TimeLine[];
    ngOnInit(): void {
        this.timeService.list().then (
            res => {
                this.times = res as TimeLine[];
            },err=>{
                console.log(err);
            }
            
        )
    }
    delete(id :number){
        var rv = confirm(`Are you sure delete id ${id}`);
        if(rv){
            this.timeService.delete(id).then(res =>{
                alert("Success!")
                this.ngOnInit();
            },er =>{
                console.log(er);
            })
        }
        
    }
}