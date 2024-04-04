import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ConfirmationService, MessageService } from 'primeng/api';
import { Route, Router } from "@angular/router";
import { IAccountService } from "../Services/account.service";
import { AccountModel } from "../Models/account.model";
import { formatDate } from "@angular/common";

@Component({
    templateUrl : './verifycode.component.html'
})

export class VerifyComponent implements OnInit {

    constructor(private messageService: MessageService,
        private readonly _formBuilder : FormBuilder,
        private readonly _IAccountService : IAccountService,
        private readonly _router : Router){}

    formVerify : FormGroup;

    ngOnInit(): void {

        this.formVerify = this._formBuilder.group({
            securityCode : ''
        })

        this.messageService.add({
        severity: 'success', 
        summary: 'Notification', 
        detail: `Registrations successfully.` })
    }

    c(){
        this.messageService.add({ key: 'tc', 
        severity: 'success', 
        summary: 'Notification', 
        detail: `Registrations successfully.` })
    }

    verify(){

        const emailAccount = sessionStorage.getItem('emailAccount');
        var form = this.formVerify.value;

        this._IAccountService.getByEmail(emailAccount).then(response=>{
            var code : AccountModel = response as AccountModel;
       
            if(form.securityCode == code.securityCode){
                code.status = true;
                code.securityCode = null;
                code.doB = formatDate(code.doB, "dd/MM/yyyy","EN-US");
                this._IAccountService.Update(code).then(response=>{
                    if(response){
                        this.messageService.add({ key: 'tc', 
                        severity: 'success', 
                        summary: 'Notification', 
                        detail: `Verify successfully.` })
                        
                        this._router.navigate(['/'])

                    }else{
                        this.messageService.add({ key: 'tc', 
                        severity: 'error', 
                        summary: 'Notification', 
                        detail: `Verify Failure.` })
                    }
                },er=>console.log(er));
            }else{
                this.messageService.add({ key: 'tc', 
                severity: 'error', 
                summary: 'Notification', 
                detail: `Pls check your verify.` })
            }



        },er=>console.log(er));
    }

}