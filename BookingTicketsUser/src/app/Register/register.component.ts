import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { IAccountService } from "../Services/account.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { AccountModel } from "../Models/account.model";
import { formatDate } from "@angular/common";

@Component({
    templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
    constructor(private _accountService : IAccountService,
        private _formBuilder : FormBuilder,
        private _route : Router,
        private confirmationService: ConfirmationService, 
        private messageService: MessageService){}

    formCreation: FormGroup;
    ngOnInit(): void {
        this.formCreation = this._formBuilder.group({
            email: ['', [Validators.required, Validators.pattern(/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
            fullName : [
                '',
                [
                  Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)
                ],
              ],
            doB: '',
            address : [
                '',
                [
                  Validators.required,
                ],
              ],
            password: [
                '',
                [
                  Validators.required,
                  Validators.pattern(
                    '^((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[~`!@#$%^&*()_+=]).{6,20})$'
                  ),
                ],
              ],
            confirm: '',
            phone: [
                '',
                [
                  Validators.required,
                  Validators.minLength(8),
                    Validators.maxLength(15)
                ],
              ],
            securityCode : ''
        });
    }
    
    save(){
        this._route.navigate(['/login']);
    }

    RandomCode(length : number): string{
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        let randomCode = "";

        for(let i = 0; i < length;i++){
            randomCode += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        
        return randomCode;
    }

    creation(){
        var form : AccountModel = this.formCreation.value as AccountModel;
        form.status = false;
        form.level = 4;
        form.securityCode = this.RandomCode(4);        

        if(form.doB===null || form.doB === undefined || form.doB === ""){
            // form.doB = formatDate(Date.now()+'', "dd/MM/yyyy","EN-US");

        }else{

            form.doB = formatDate(form.doB, 'dd/MM/yyyy',"EN-US");

        }

        if(form.password != this.formCreation.value.confirm){
            this.messageService.add({ 
                severity: 'error', 
                summary: 'Error', 
                detail: `Wrong password or confirm password. Please check again.` });

        }else{
            this._accountService.CheckEmailExists(form.email).then(response=>{
                if(!response){
                    this._accountService.Creation(form).then(response=>{
                        if(response){
                            this.messageService.add({ key: 'tc', 
                            severity: 'success', 
                            summary: 'Notification', 
                            detail: `Registrations successfully.
                            Please check email to receive code and verify to active your account` })
                            
                            sessionStorage.setItem('emailAccount', form.email);

                            this._route.navigate(['/verify',{'email':form.email}]);
                            
                            setTimeout(()=>{
                                location.reload();
                            },2000);

                        }else{
                            this.messageService.add({ severity: 'error', 
                            summary: 'Error', 
                            detail: `Failure.` });
                        }
                    },er=>console.log(er));
                }else{
                    this.messageService.add({ severity: 'error', 
                    summary: 'Error', 
                    detail: `This email ${form.email} is exist. Please u can use a new email.` });
                }
            },er=>console.log(er))
        }
    }
}