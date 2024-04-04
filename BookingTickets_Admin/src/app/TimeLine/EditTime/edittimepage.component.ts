import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Resultapi } from "src/app/models/resultapi.model";
import { TimeLine } from "src/app/models/timeline.model";
import { TimeService } from "src/app/services/timeService";

@Component({
    templateUrl: './edittimepage.component.html'
})

export class EditTimeComponent implements OnInit{
    constructor(
        private timeService: TimeService,
        private formBuilder: FormBuilder,
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
    ) {}

    editTimeLine :FormGroup;

    id: number;

    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe(assignment=>{
            this.id = parseInt(assignment.get('id'));
        })

        this.timeService.getid(this.id).then (res => {
            var timeLine = res as TimeLine;

            this.editTimeLine = this.formBuilder.group({
                line: [
                    timeLine.line,
                    [
                        Validators.required,
                    ],
                    ],
            });
        })
    }
    Edit(){
        var line: TimeLine = this.editTimeLine.value as TimeLine;
        line.id = Number(this.id);
        this.timeService.edit(line).then(res=>{
            var rs = res as Resultapi;
            if(rs.status){
                alert('Failure');
            }else{
                alert('Succses');
                this._router.navigate(['/listtime'])
            }
        },er=>console.log(er))
    }
    
}

