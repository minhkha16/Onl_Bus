import { Component, OnInit } from "@angular/core";
import { Message, MessageService } from "primeng/api";
import { IAccountService } from "../Services/account.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AccountModel } from "../Models/account.model";

@Component({
    templateUrl: './changePassword.component.html'
})

export class ChangePasswordComponent implements OnInit {
    messages: Message[] | undefined;

    constructor(private _account : IAccountService,
        private _formBuilder : FormBuilder,
        private _messageService : MessageService,
        private readonly _router : Router){}
    
    formChangePassword : FormGroup;

    email : string;

    ngOnInit(): void {
        this.formChangePassword = this._formBuilder.group({
            currentPassword : ['',[Validators.required,
                Validators.minLength(3),
                Validators.maxLength(15),
                Validators.pattern('^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_+=]).{6,20})$')]],
            password : '',
            confirm: ''
        });

        if(sessionStorage.getItem('email')!=null){
            this.email = sessionStorage.getItem('email');
        }

    }

    changePasswordWithCurrentPassword(){
        var form = this.formChangePassword.value;

        if(form.password !== form.confirm){
            this._messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: 'Wrong password or confirm password' ,
            });
        }else{
            this._account.getByEmail(this.email).then(obj=>{
                var account = obj as AccountModel;
                this._account.ChangePasswordWithCurrentPassword(this.email, form.currentPassword).then(response=>{
                    if(response){
                        account.password = form.password;
                        this._account.Update(account).then(response=>{
                            if(response){
                                this._messageService.add({ 
                                    severity: 'success',
                                    summary: 'Notification', 
                                    detail: 'Congratulations!!! Change Password successfully',
                                });

                                setTimeout(() => {
                                    location.reload();
                                }, 2000);

                            }else{
                                this._messageService.add({ 
                                    severity: 'error', 
                                    summary: 'Error', 
                                    detail: 'Failure' ,
                                });
                            }
                        },er=>console.log(er));
                        console.log(response);
                        
                    }else{
                            this._messageService.add({ 
                            severity: 'error', 
                            summary: 'Error', 
                            detail: 'Wrong current password' ,
                        });
                    }
                },er=>console.log(er.message));
            },er=>console.log(er));            
        }

    }
}