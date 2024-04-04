import { Component, OnInit } from "@angular/core";
import { IChairService } from "../Services/chair.service";
import { ChairCarModel } from "../Models/chaircar.model";
import { IChairCarService } from "../Services/chaircar.service";
import { NumberValueAccessor } from "@angular/forms";
import { Message,MessageService } from "primeng/api";
import { ActivatedRoute, Router } from "@angular/router";
import { CarService } from "../Services/carService";
import { Car } from "../Models/car.model";
import { Timeapi } from "../Services/timeapi.service";
import { TimeLineModel } from "../Models/timeline.model";
import { formatDate } from "@angular/common";
import { IInvoicesService } from "../Services/invoice.service";
import { InvoiceModel } from "../Models/invoice.model";
import { InvoiceDetailModel } from "../Models/invoicedetail.model";


import { IInvoiceDetailService } from "../Services/invoicedetail.service";

@Component({
    templateUrl: './chair.component.html'
})

export class BookchairComponent implements OnInit {

    constructor(private _chairCarService: IChairCarService,
        private _chairService : IChairService,
        private _router : Router,
        private _messageService : MessageService,
        private _carService : CarService,
        private readonly _ITimeLineService : Timeapi,
        private _invoiceService : IInvoicesService,
        private _invoicedetailService : IInvoiceDetailService,
        private readonly _routerActive : ActivatedRoute){}

    chairs : ChairCarModel[] = [];
    idChair : number;
    idCar : string;
    mang = [];
    cars : Car[] = [];
    timelines : TimeLineModel[] = [];
    idTimeLine : number;
    dateBook : string;
    subject:string = '';
    countdown :number = 0;
    qtyTheChair : number;
    list_price_invoicedetail:any[] = [];
    
    ngOnInit(): void {

        // if(sessionStorage.getItem('email')===null){
        //     this._router.navigate(['/notfound']);
        // }

        this._carService.getAllCar().then(response=>{
            this.cars = response as Car[];
        },er=>console.log(er));

        this._ITimeLineService.getAll().then(response=>{
            this.timelines = response as TimeLineModel[];
        },er=>console.log(er));

        this._routerActive.paramMap.subscribe(asignments=>{
            this.idTimeLine = Number(asignments.get('id_time'));
            this.idCar = asignments.get('id_car');
            this.dateBook = asignments.get('datebook');

            console.log("time : ", this.idTimeLine);
            console.log("car : ", this.idCar);
            console.log("date : ", this.dateBook);
            

            this._chairCarService.getIdCarAndIdTimeLineAndDateBook(this.idCar,this.idTimeLine,this.dateBook).then(response=>{
                this.chairs = response as ChairCarModel[];
            },er=>console.log(er));
        });

    }


    book(a : any){
        
        this.idChair = a.target.value;
        var c  = true;
          
        if(this.mang.length > 0){
            for(let i = 0; i < this.mang.length; i++){                               
                if(this.idChair == this.mang[i]){
                    this.mang.splice(i,1);
                    c = false;
                }
            }
            if(c){
                this.mang.push(this.idChair);
            }
                      
        }else{
            this.mang.push(this.idChair);
        }
        

        console.log(this.mang);
        
        
        // let c = document.querySelector('p');
        // c.addEventListener('click',(b)=>{
        //     c.classList.toggle(`${b.target}`);
        // });
        // console.log(c);
    }

    getIdCar(a : string){
        this.idCar = a;
    }


    get(){
       
        this.list_price_invoicedetail=[];
        if(this.idCar == null){
            this._messageService.add({ severity: 'error', 
            summary: 'Error', 
            detail: 'Let choose a chair.' ,
            });
        }

        if(this.idTimeLine == null){
            this._messageService.add({ severity: 'error', 
            summary: 'Error', 
            detail: 'Let choose a timeline.' ,
            });
        }
        
        
        if(this.mang.length <= 0){
            this._messageService.add({ severity: 'error', 
            summary: 'Error', 
            detail: 'Let select your seat.' ,
            });
        }
        var check = 0;
        var invoice: InvoiceModel = new InvoiceModel();
       
           
        let count = true;

        let qtyTickets = 0;
        var b=0;
        if(b==0){
            this.mang.map((a : any)=>{
                b=1;
                if(count){
                    this._chairCarService.getByIdChairAndIdCarAndDateBook(a,this.idCar,this.dateBook).then(response=>{
                        var obj : ChairCarModel = response as ChairCarModel
                        obj.idAccount = Number(sessionStorage.getItem('idAccount'));
                        obj.status = false;
                        obj.subjectChair = this.subject;
                        console.log(obj);
                        
                        
                        this._chairCarService.Update(obj).then(res=>{
                            if(res){
                                
                                qtyTickets+=1;
                                this._messageService.add({ severity: 'success', 
                                summary: `Notification : `, 
                                detail: `Book ${qtyTickets} tickets successfully. The number of ticket is ${a}`,
                                });
    
                            }else{
                                this._messageService.add({ severity: 'error', 
                                summary: `Error.`, 
                                detail: 'Failure' ,
                                });
                            }
                          
                        },er=>console.log(er));
                        
                    },er=>console.log(er));
                }else{
    
                }
            });
        }
       if(b==1){
        this._invoiceService.checkInvoice(Number(sessionStorage.getItem('idAccount'))).then(
            result => {
                check = result as number;
                var n =0;
                console.log("check:"+check);
               if(check == 0){
                n=n+1;
                    invoice.status ='ready';
                    invoice.idAccount =  Number(sessionStorage.getItem('idAccount'));
                    invoice.date = formatDate(new Date(), 'dd/MM/yyyy', 'en-US');
                    console.log(invoice);
                    this._invoiceService.Add(invoice).then(
                        result => {
                            if(result){
                                
                                this.mang.map((a : any)=>{
                                    n=n+1;
                                    var invoicedetail: InvoiceDetailModel = new InvoiceDetailModel();
                                    this._chairCarService.getIdChairCar(a,this.idCar,this.idTimeLine).then(
                                        result => {
                                            invoicedetail.idChairCar = result as number;
                                           
                                            this._invoiceService.getIdInvoice(Number(sessionStorage.getItem('idAccount'))).then(
                                                result => {
                                                    invoicedetail.idIvoiceCar = result as number;
                                                    this._invoicedetailService.Add(invoicedetail);                             
                                                    this._invoiceService.getByIdAccount(Number(sessionStorage.getItem('idAccount'))).then(
                                                        result => {
                                                            var invoiceforupdate: InvoiceModel = new InvoiceModel();
                                                            
                                                            invoiceforupdate = result as InvoiceModel;
                                                            console.log(invoiceforupdate);
                                                            console.log(invoicedetail.idIvoiceCar);
                                                            console.log(this.dateBook);
                                                            console.log(invoicedetail.idChairCar);
                                                            this._invoicedetailService.getPriceInvoiceDetails(invoicedetail.idIvoiceCar,invoicedetail.idChairCar,this.dateBook).then(result => {
                                                                this.list_price_invoicedetail = [];
                                                                this.list_price_invoicedetail = result as any[]; 
                                                                // console.log(result);
                                                                console.log(this.list_price_invoicedetail);
                                                                console.log("a là :" + a );
                                                                if(a!=0){ 
                                                                    this.list_price_invoicedetail.forEach(p => {
                                                                        this._chairCarService.checkSubject(a,this.idCar,this.idTimeLine).then(
                                                                            result=>{
                                                                                var subject ='';
                                                                                subject =  result as string;
                                                                                console.log(subject);
                                                                                if(subject=="Elder"){
                                                                                    console.log(p.price);
                                                                                    
                                                                                    if(invoiceforupdate[0].total==null){ 
                                                                                        invoiceforupdate[0].total =0;
                                                                                    }
                                                                                    invoiceforupdate[0].total = invoiceforupdate[0].total + (p.price*70/100)*n;
                                                                                    // console.log(invoiceforupdate[0]);
                                                                                    this._invoiceService.update( invoiceforupdate[0]).then(
                                                                                        result=>{
                                                                                            if(result){
                                                                                                console.log(result);
                                                                                                this.mang=[];
                                                                                                setTimeout(()=>{
                                                                                                    this._router.navigate(['/cart']);
                                                                                                    
                                                                                                },3000)
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                }else if(subject=="Child"){
                                                                                    if(invoiceforupdate[0].total==null){ 
                                                                                        invoiceforupdate[0].total =0;
                                                                                    }
                                                                                    invoiceforupdate[0].total += 0;
                                                                                    this._invoiceService.update(invoiceforupdate[0]).then(
                                                                                        result=>{
                                                                                            console.log(result);
                                                                                            if(result){
                                                                                                this.mang=[];
                                                                                                setTimeout(()=>{
                                                                                                    this._router.navigate(['/cart']);
                                                                                                    
                                                                                                },3000)
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                }else{
                                                                                    if(invoiceforupdate[0].total==null){ 
                                                                                        invoiceforupdate[0].total =0;
                                                                                    }
                                                                                    invoiceforupdate[0].total += p.price*n;
                                                                                    console.log(p.price);
                                                                                    this._invoiceService.update(invoiceforupdate[0]).then(
                                                                                        result=>{
                            
                                                                                            if(result){
                                                                                                this.mang=[];
                                                                                                setTimeout(()=>{
                                                                                                    this._router.navigate(['/cart']);
                                                                                                    
                                                                                                },3000)
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                }
                                                                                
                                                                            },error=>{
                                                                                console.log(error);
                                                                            });
                                                                       
                                                                    });
                                                                 }
                                                                
                                                            },
                                                            error => {
                                                                console.log(error);
                                                            });
                                                           
                
                                                            
                                                        },
                                                        error => {
                                                            console.log(error);
                                                        }
                                                    );
                                                },
                                                error => {
                                                    console.log(error);
                                                }
                                            );   
                                        },
                                        error => {
                                            console.log(error);
                                        }
                                    );
                                })
                            }
                        },
                    );
                    
               }else{
                this.mang.map((a : any)=>{
                    n=n+1;
                    var invoicedetail: InvoiceDetailModel = new InvoiceDetailModel();
                    this._chairCarService.getIdChairCar(a,this.idCar,this.idTimeLine).then(
                        result => {
                            invoicedetail.idChairCar = result as number;
                           
                            this._invoiceService.getIdInvoice(Number(sessionStorage.getItem('idAccount'))).then(
                                result => {
                                    invoicedetail.idIvoiceCar = result as number;
                                    this._invoicedetailService.Add(invoicedetail);                             
                                    this._invoiceService.getByIdAccount(Number(sessionStorage.getItem('idAccount'))).then(
                                        result => {
                                            var invoiceforupdate: InvoiceModel = new InvoiceModel();
                                            
                                            invoiceforupdate = result as InvoiceModel;
                                            console.log(invoiceforupdate);
                                            console.log(invoicedetail.idIvoiceCar);
                                            console.log(this.dateBook);
                                            console.log(invoicedetail.idChairCar);
                                            this._invoicedetailService.getPriceInvoiceDetails(invoicedetail.idIvoiceCar,invoicedetail.idChairCar,this.dateBook).then(result => {
                                                this.list_price_invoicedetail = [];
                                                this.list_price_invoicedetail = result as any[]; 
                                                // console.log(result);
                                                console.log(this.list_price_invoicedetail);
                                                console.log("a là :" + a );
                                                if(a!=0){ 
                                                    this.list_price_invoicedetail.forEach(p => {
                                                        this._chairCarService.checkSubject(a,this.idCar,this.idTimeLine).then(
                                                            result=>{
                                                                var subject ='';
                                                                subject =  result as string;
                                                                console.log(subject);
                                                                if(subject=="Elder"){
                                                                    console.log(p.price);
                                                                    
                                                                    if(invoiceforupdate[0].total==null){ 
                                                                        invoiceforupdate[0].total =0;
                                                                    }
                                                                    invoiceforupdate[0].total = invoiceforupdate[0].total + (p.price*70/100)*n;
                                                                    // console.log(invoiceforupdate[0]);
                                                                    this._invoiceService.update( invoiceforupdate[0]).then(
                                                                        result=>{
                                                                            if(result){
                                                                                console.log(result);
                                                                                this.mang=[];
                                                                                setTimeout(()=>{
                                                                                    this._router.navigate(['/cart']);
                                                                                    
                                                                                },3000)
                                                                            }
                                                                        }
                                                                    );
                                                                }else if(subject=="Child"){
                                                                    if(invoiceforupdate[0].total==null){ 
                                                                        invoiceforupdate[0].total =0;
                                                                    }
                                                                    invoiceforupdate[0].total += 0;
                                                                    this._invoiceService.update(invoiceforupdate[0]).then(
                                                                        result=>{
                                                                            console.log(result);
                                                                            if(result){
                                                                                this.mang=[];
                                                                                setTimeout(()=>{
                                                                                    this._router.navigate(['/cart']);
                                                                                    
                                                                                },3000)
                                                                            }
                                                                        }
                                                                    );
                                                                }else{
                                                                    if(invoiceforupdate[0].total==null){ 
                                                                        invoiceforupdate[0].total =0;
                                                                    }
                                                                    invoiceforupdate[0].total += p.price*n;
                                                                    console.log(p.price);
                                                                    this._invoiceService.update(invoiceforupdate[0]).then(
                                                                        result=>{
            
                                                                            if(result){
                                                                                this.mang=[];
                                                                                setTimeout(()=>{
                                                                                    this._router.navigate(['/cart']);
                                                                                    
                                                                                },3000)
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                                
                                                            },error=>{
                                                                console.log(error);
                                                            });
                                                       
                                                    });
                                                 }
                                                
                                            },
                                            error => {
                                                console.log(error);
                                            });
                                           

                                            
                                        },
                                        error => {
                                            console.log(error);
                                        }
                                    );
                                },
                                error => {
                                    console.log(error);
                                }
                            );   
                        },
                        error => {
                            console.log(error);
                        }
                    );
                })
               }
            },
            error => {
                console.log(error);
            }
        ); 
       }
       
    }

    render(){

        if(this.chairs.length <= 0){
            console.log(123);
            
        }
    }

    getIdTimeLine(a: number){
        this.idTimeLine = a;

    }

    // getDate(a : any){
    //     console.log(a);
        
    //     let date = formatDate(a,"dd-MM-yyyy","EN-US");
    //     this.dateBook = date;
    //     console.log(this.dateBook);
        
    // }
    
    search(){

        if(this.idCar == null){
            this._messageService.add({ severity: 'error', 
            summary: 'Error', 
            detail: 'Let choose a chair.' ,
            });
        }

        if(this.idTimeLine == null){
            this._messageService.add({ severity: 'error', 
            summary: 'Error', 
            detail: 'Let choose a timeline.' ,
            });
        }

        if(this.dateBook == "" || this.dateBook == null || this.dateBook == undefined){
            this._messageService.add({ severity: 'error', 
            summary: 'Error', 
            detail: 'Let choose a date.' ,
            });
        }

        this.dateBook = formatDate(this.dateBook,"dd-MM-yyyy","EN-US");

        this._chairCarService.countTheChairAvailable(this.idCar,this.idTimeLine,this.dateBook).then(response=>{
            console.log(response);
            
            this.qtyTheChair = Number(response);
        },er=>console.log(er));
        


        // this.dateBook = "";
    }

    test(){
        let a = document.querySelector('.test');

        a.classList.toggle('active');
        this.chairs.map((a:any)=>{            
            const para = document.createElement("div");
            para.classList.add("chair");
            para.innerText = a.idChair;
            para.style.background = "#909498";
            para.style.width = '30px';
            para.style.height = '30px';
            para.style.textAlign = 'center';
            para.style.cursor = 'pointer';
            para.addEventListener('click', function (){
                var count = 1;
                if(count==1){
                    para.style.background = "red";
                }

                if(count != 1){
                    para.style.background = "#909498";
                }

                // para.classList.toggle('active');
            });
            document.querySelector(".n").appendChild(para);
        });

    }
    chooseSubject(evt:any){
        this.subject =evt.target.value;
        console.log(this.subject);
    }
    lm(a: any){
        console.log((a.target.value));
        
    }
}