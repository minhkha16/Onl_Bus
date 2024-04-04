import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Account } from "src/app/models/account.model";
import { AccountService } from "src/app/services/account.service";

@Component({
    templateUrl: './editAccount.component.html'
})

export class editAccountComponent implements OnInit{
    constructor(
        private _formBuilder: FormBuilder,
        private accountService: AccountService,
        private _activatedRoute: ActivatedRoute,
        private router: Router,
    ){
    }
    id:number;
    editaccount :FormGroup;
    ngOnInit(): void {
        this._activatedRoute.paramMap.subscribe(assignment=>{
            this.id = parseInt(assignment.get('id'));
        })
        this.accountService.Getid(this.id).then(
            res=>{
                var ac = res as Account;
                console.log(ac);
                
                this.editaccount = this._formBuilder.group({
                    fullname: ac.fullName,
                    dob : ac.dob,
                    email: ac.email,
                    level: ac.level,
                    phone: ac.phone,
                    address :ac.address,
                    password:""
                })
            }
        )
    }

    update(){
        var updateacc = this.editaccount.value as Account;
        updateacc.id = this.id;
        updateacc.dob = formatDate(updateacc.dob,'dd/MM/yyyy', 'en-US')
        this.accountService.Edit(updateacc).then(
            res=>{
                if(res){
                    this.router.navigate(['/listaccount'])
                }
            },error=> console.log(error)
        )
    }
}