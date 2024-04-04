import { Component, OnInit } from "@angular/core";
import { AccountModel } from "../Models/account.model";
import { formatDate } from "@angular/common";
import { IAccountService } from "../Services/account.service";
import { ConfirmationService, MessageService } from "primeng/api";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    templateUrl: './profile.component.html'
})

export class ProfileComponent implements OnInit {
    name : string;

    profile : AccountModel;

    formProfile : FormGroup;

    constructor(private _accountService : IAccountService,
        private _router : Router,
        private _formBuilder : FormBuilder,
        private confirmationService: ConfirmationService, 
        private messageService: MessageService){}

    ngOnInit(): void {
        this._accountService.getByEmail(sessionStorage.getItem('email')).then(response=>{
            let obj : AccountModel = response as AccountModel;
            
            this.profile = obj;
            
            this.name = obj.fullName;

            this.formProfile = this._formBuilder.group({
                id: obj.id,
                fullName : obj.fullName,
                email : obj.email,
                doB : obj.doB,
                phone : obj.phone,
                address : obj.address,
                level : obj.level,
                status : obj.status
            })
        },er=>console.log(er));
    }

    ChangeProfile(event : any){
        this._accountService.getByEmail(sessionStorage.getItem('email')).then(response=>{
            let form : AccountModel = this.formProfile.value as AccountModel;
            form.doB = formatDate(form.doB.toString(),'dd/MM/yyyy',"EN-US");
            
            console.log(form);
            
            this._accountService.Update(form).then(response=>{
                console.log(response);
                if(response){
                    this.messageService.add({ key: 'tc', 
                    severity: 'success', 
                    summary: 'Notification', 
                    detail: 'Change Password Succesfully' });
                    location.reload();
                }else{
                    this.messageService.add({ 
                        severity: 'error', 
                        summary: 'Notification',
                        detail: 'Failure' });
                }
            },er=>console.log(er));
        },er=>console.log(er));
    }

    logout(event : any){
        
    }
    
}