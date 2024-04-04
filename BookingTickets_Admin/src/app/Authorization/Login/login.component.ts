import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Account } from "src/app/models/account.model";
import { AccountService } from "src/app/services/account.service";

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    constructor(
        private _router: Router,
        private accountService: AccountService,
        private _formBuilder: FormBuilder,
        ){}
        log: FormGroup;
        ngOnInit(): void {
        this.log = this._formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
            password: [
                '',
                [
                  Validators.required,
                //   Validators.pattern(
                //     '^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_+=]).{6,20})$'
                //   ),
                ],
              ],
       })
    }

    Login(){
        var lg = this.log.value as Account;
       this.accountService.Login(lg).then(
         res =>{
            if(res){
                localStorage.setItem('email', lg.email);
                this._router.navigate(['']);
            }else{
                console.log("Fails")
            }
         },err => console.log(err)
       )
    }
}