import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AccountModel } from "../Models/account.model";
import { Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { ConfirmationService, MessageService } from 'primeng/api';
import { IAccountService } from "../Services/account.service";

@Component({
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {

    constructor(private _accountService : IAccountService,
        private _formBuilder : FormBuilder,
        private _route : Router,
        private confirmationService: ConfirmationService, 
        private messageService: MessageService){}

    formCreation : FormGroup;
    
    formLogin : FormGroup;

    level: number;

    value : string;

    email : string;

    password : string;

    accountName : string;

    name : string;

    ngOnInit(): void {

        this.name = sessionStorage.getItem('fullname');

        this.formCreation = this._formBuilder.group({
            email: '',
            fullName : '',
            doB: '',
            address : '',
            password: '',
            confirm: '',
            phone: '',
            securityCode : ''
        });

        this.level = Number(sessionStorage.getItem('level'));

        if(sessionStorage.getItem('fullname')!=null){
            this.accountName = sessionStorage.getItem('fullname');
        }

        this.email = sessionStorage.getItem('email');

    }

    logout(event : any){
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Are you sure that you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.messageService.add({ key: 'tc', severity: 'success', summary: 'Notification', detail: 'Byeeeeeeee' });
                this._route.navigate(['/']);
                setTimeout(()=>{
                    location.reload();
                    sessionStorage.clear();
                },2000)
                
            },
            reject: () => {
                this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
            }
        });
    }

    a(){
        // this.id = Number(sessionStorage.getItem('idAccount'));
        // if(this.id === 4){
        //     alert('Không đủ quyền hạn.');
        //     this.ngOnInit();
        // }
    }

    RandomCode(length : number): string{
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890,./;'[]\=-)(*&^%$#@!~`";
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
            form.doB = formatDate(Date.now()+'', "dd/MM/yyyy","EN-US");
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

                            setTimeout(()=>{
                                this._route.navigate(['/verify']);
                            },5000);
                            
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

    login(){
        this._accountService.Login(this.email, this.password).then(response=>{
            if(response){
                this._route.navigate(['/flight']);
                this._accountService.getByEmail(this.email).then((response : AccountModel)=>{
                    sessionStorage.setItem('fullname', response.fullName);
                    sessionStorage.setItem('email', response.email);
                    sessionStorage.setItem('level', response.level + '');
                    sessionStorage.setItem('idAccount', response.id + '');
                    this.messageService.add({ key: 'tc', 
                    severity: 'success', 
                    summary: 'Notification', 
                    detail: `Hello ${sessionStorage.getItem('fullname')}` });
                    location.reload();
                },er=>console.log(er));
            }else{
                this.messageService.add({ severity: 'error', 
                summary: 'Error', 
                detail: `Does't exist account ${this.email}` });
            }
        },er=>console.error(er));
    }
}