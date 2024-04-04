import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Account } from "src/app/models/account.model";
import { Car } from "src/app/models/car.model";
import { CarService } from "src/app/services/CarService";
import { AccountService } from "src/app/services/account.service";

@Component({
    templateUrl: './lisAccount.component.html'
})

export class listAccountComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private accountService: AccountService
    ){
    }
    accs: Account[];
    ngOnInit(): void {
        this.accountService.List().then (
            res => {
                this.accs = res as Account[];
                console.log(this.accs);
            },err=>{
                console.log(err);
            }
            
        )
    }

   
}