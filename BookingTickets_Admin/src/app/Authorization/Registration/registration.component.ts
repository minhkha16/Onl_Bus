import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Account } from "src/app/models/account.model";
import { AccountService } from "src/app/services/account.service";

@Component({
    templateUrl: './registration.component.html'
})

export class RegistrationComponent implements OnInit {
    constructor(
        private accountService: AccountService,
        private _formBuilder: FormBuilder,
        private _router: Router,
    ) {}
    register :FormGroup;
    ngOnInit(): void {
        this.register = this._formBuilder.group({
            fullname: [
                '',
                [
                  Validators.required,
                ],
              ],
            dob:"",
            email: ['', [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
            password: [
                '',
                [
                  Validators.required,
                ],
              ],
            phone: [
                '',
                [
                  Validators.required,
                ],
              ],
            address: [
            '',
            [
                Validators.required,
            ],
            ],
        })
    }
    save(){
        var regis = this.register.value as Account;
        regis.dob = formatDate( regis.dob,'dd/MM/yyyy', 'en-US')
        this.accountService.add(regis).then(
            res => {
                if(res){
                    this._router.navigate(['/background/login']);
                }
            },err =>console.log(err)
        )
    }
}