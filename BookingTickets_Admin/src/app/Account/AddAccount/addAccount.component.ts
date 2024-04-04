import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/models/account.model";
import { Car } from "src/app/models/car.model";
import { CategoryCar } from "src/app/models/categoryCar";
import { CarService } from "src/app/services/CarService";
import { AccountService } from "src/app/services/account.service";
import { CateService } from "src/app/services/cateService";

@Component({
    templateUrl: './addAccount.component.html'
})

export class AddAccountComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private accountService: AccountService,
        private _router: Router,
    ){
    }
    acc :FormGroup;
    ngOnInit(): void {
        this.acc = this._formBuilder.group({
            fullname: "",
            dob: "",
            level:1,
            address: "",
            phone:"",
            email:"",
            password:""
        });
        
    }

    save(){
        var ac = this.acc.value as Account;
        ac.dob = formatDate(ac.dob,'dd/MM/yyyy', 'en-US')
        console.log(ac)
        this.accountService.add(ac).then(
            res=>{
                if(res){
                    console.log(res);
                    alert("Success!")
                    this._router.navigate(['/listaccount']);
                }
            },error=> console.log(error)
        )
    }
}