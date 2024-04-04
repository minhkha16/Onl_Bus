import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { IAccountService } from "../Services/account.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { AccountModel } from "../Models/account.model";

@Component({
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    constructor(private _accountService : IAccountService,
        private _formBuilder : FormBuilder,
        private _route : Router,
        private confirmationService: ConfirmationService, 
        private messageService: MessageService){}
        
        formLogin : FormGroup;
    
        level: number;
    
        value : string;
    
        email : string;
    
        password : string;
    
        accountName : string;
    
        name : string;

    ngOnInit(): void {
        this.formLogin = this._formBuilder.group({
            fullname: "",
            password: "",
        })
    }
    
    forgotPassword(){

        this._route.navigate(['/verify']);

        setTimeout(()=>{
            location.reload();
        },1000);
    }

    login(){
        this._accountService.checkStatus(this.email).then(response=>{
            if(response===true){
                this._accountService.Login(this.email, this.password).then(response=>{
                    if(response){
                        this._accountService.getByEmail(this.email).then((response : AccountModel)=>{
                            sessionStorage.setItem('fullname', response.fullName);
                            sessionStorage.setItem('email', response.email);
                            sessionStorage.setItem('level', response.level + '');
                            sessionStorage.setItem('idAccount', response.id + '');
                            this.messageService.add({ key: 'tc', 
                            severity: 'success', 
                            summary: 'Notification', 
                            detail: `Hello ${sessionStorage.getItem('fullname')}` });

                            this._route.navigate(['/']);

                            setTimeout(()=>{
                                location.reload();
                            },2000);

                        },er=>console.log(er));
                    }else{
                        this.messageService.add({ severity: 'error', 
                        summary: 'Error', 
                        detail: `Does't exist account ${this.email}` });
                    }
                },er=>console.error(er));
            }else{
                this.messageService.add({ key: 'tc', 
                severity: 'error', 
                summary: 'Notification', 
                detail: `Pls check ur email to get VerifyCode.` });

                sessionStorage.setItem('email', this.email);

                this._route.navigate(['/verify']);

                setTimeout(()=>{
                    location.reload();
                },1000);
            }
        },er=>console.log(er));
    }
}