import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { TimeLine } from "src/app/models/timeline.model";
import { TimeService } from "src/app/services/timeService";

@Component({
    templateUrl: './addtimepage.component.html'
})

export class AddTimeComponent implements OnInit{
    constructor(
        private formBuilder: FormBuilder,
        private timelineService: TimeService,
        private _router: Router
    ){
    }
    addTimeLine :FormGroup;
    
    ngOnInit(): void {
        this.addTimeLine = this.formBuilder.group({
            line: [
                '',
                [
                    Validators.required,
                ],
                ],
        });
    }
    save(){
        var timeline =  this.addTimeLine.value as TimeLine;
        this.timelineService.add(timeline).then(res => {
            alert("Success!");
            this._router.navigate(['/listtime'])
        },err => console.log(err)
        )
    }
    
}

