import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { IInvoiceDetailService } from "../Services/invoicedetail.service";
import { IInvoicesService } from "../Services/invoice.service";
import { DiscountService } from "../Services/discount.service";
import { InvoiceModel } from "../Models/invoice.model";
import { IChairCarService } from "../Services/chaircar.service";
import { ChairCarModel } from "../Models/chaircar.model";

@Component({
    templateUrl: './cart.component.html'
})

export class CartComponent implements OnInit {
    public payPalConfig?: IPayPalConfig;
    constructor(
        private _router: Router,
        private _invoicedetailService : IInvoiceDetailService,
        private _invoiceService: IInvoicesService,
        private _discountService: DiscountService,
        private _chaircarService:IChairCarService,
       
    ){}
    list_details_carts:any[]=[];
    total_price:number =0;
    content:string='';
    price_discount:number =0;
    check:number =0;
    msg:string='';
    id_account:number =0;
    ngOnInit(): void {
      this.id_account = Number(sessionStorage.getItem('idAccount'));
        this.initConfig();
        this._invoiceService.getTotalPrice(Number(sessionStorage.getItem('idAccount'))).then(
          result => {
            this.total_price = result as number;
          },
          error => {
            console.log(error);
          }
        );
        this._invoicedetailService.getDetailForCart(Number(sessionStorage.getItem('idAccount'))).then(
          result => {
            this.list_details_carts = result as [];
            console.log(this.list_details_carts);

          },
          error => {
            console.log(error);
          }
        );
    }
    contentDiscount(evt:any){
      this.content = '';
      this.content = evt.target.value;
      console.log(this.content);
    }
    discount(){
      this._discountService.getByCode(Number(sessionStorage.getItem('idAccount')), this.content).then(
        result => {
          this.price_discount = result as number;
          if(this.price_discount>0){
            this.check =1;
            this.msg="Ap dụng mã thành công, bạn được giảm "+this.price_discount +" VNĐ vào hóa đơn";
            this.total_price -=this.price_discount;
            this._invoiceService.getByIdAccount(Number(sessionStorage.getItem('idAccount'))).then(
              result => {
                var invoiceforupdate: InvoiceModel = new InvoiceModel();
                invoiceforupdate = result as InvoiceModel;
                invoiceforupdate[0].total = this.total_price;
                this._invoiceService.update(invoiceforupdate[0]);  
              },
              error =>{
                console.log(error);
              }
            );
            console.log("thành công");
          }else{
            console.log("Thất bại");
            this.msg="Mã không tồn tại";
          }
        },
        error =>{
          console.log(error);
        }
      );
    }
    remove(idChairCar:any,price:any,subject:any){
      this._invoicedetailService.delete(Number(sessionStorage.getItem('idAccount')),idChairCar).then(
        result =>{
          if(result){
            this._invoiceService.getTotalPrice(Number(sessionStorage.getItem('idAccount'))).then(
              result => {
                this.total_price = result as number;
                this._invoiceService.getByIdAccount(Number(sessionStorage.getItem('idAccount'))).then(
                  result => {
                    var invoiceforupdate: InvoiceModel = new InvoiceModel();
                    invoiceforupdate = result as InvoiceModel;
                    if(subject=="Elder"){
                      this.total_price-= price*70/100;
                      this._chaircarService.getById(idChairCar).then(
                        result => {
                          var obj : ChairCarModel = result as ChairCarModel
                          console.log(obj);
                          obj.idAccount = 0;
                          obj.status = true;
                          obj.subjectChair =null;
                          console.log(obj);
                          this._chaircarService.Update(obj).then(
                            result => {
                              if(result){ 
                                invoiceforupdate[0].total = this.total_price;
                                console.log(invoiceforupdate);
                                this._invoiceService.update(invoiceforupdate[0]).then(
                                  result => {
                                    if(result) { 
                                      this._invoicedetailService.getDetailForCart(Number(sessionStorage.getItem('idAccount'))).then(
                                        result => {
                                          this.list_details_carts = result as [];
                                          console.log(this.list_details_carts);
                                
                                        },
                                        error => {
                                          console.log(error);
                                        }
                                      );
                                    }
                                    
                                  }
                                );  
                              }
                            }
                          );
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    }else if(subject=="Child"){
                      this.total_price-= price*0;
                      invoiceforupdate[0].total = this.total_price;
                      this._chaircarService.getById(idChairCar).then(
                        result => {
                          var obj : ChairCarModel = result as ChairCarModel
                          obj.idAccount = 0;
                          obj.status = true;
                          obj.subjectChair =null;
                          this._chaircarService.Update(obj).then(
                            result => {
                              if(result){ 
                                invoiceforupdate[0].total = this.total_price;
                                console.log(invoiceforupdate);
                                this._invoiceService.update(invoiceforupdate[0]).then(
                                  result => {
                                    if(result) { 
                                      this._invoicedetailService.getDetailForCart(Number(sessionStorage.getItem('idAccount'))).then(
                                        result => {
                                          this.list_details_carts = result as [];
                                          console.log(this.list_details_carts);
                                
                                        },
                                        error => {
                                          console.log(error);
                                        }
                                      );
                                    }
                                    
                                  }
                                );  
                              }
                            }
                          );
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    }else{
                      this.total_price-= price;
                      invoiceforupdate[0].total = this.total_price;
                      this._chaircarService.getById(idChairCar).then(
                        result => {
                          var obj : ChairCarModel = result as ChairCarModel
                          obj.idAccount = 0;
                          obj.status = true;
                          obj.subjectChair =null;
                          this._chaircarService.Update(obj).then(
                            result => {
                              if(result){ 
                                invoiceforupdate[0].total = this.total_price;
                                console.log(invoiceforupdate);
                                this._invoiceService.update(invoiceforupdate[0]).then(
                                  result => {
                                    if(result) { 
                                      this._invoicedetailService.getDetailForCart(Number(sessionStorage.getItem('idAccount'))).then(
                                        result => {
                                          this.list_details_carts = result as [];
                                          console.log(this.list_details_carts);
                                
                                        },
                                        error => {
                                          console.log(error);
                                        }
                                      );
                                    }
                                    
                                  }
                                );  
                              }
                            }
                          );
                        },
                        error => {
                          console.log(error);
                        }
                      );
                    }
                   
                  },
                  error =>{
                    console.log(error);
                  }
                );
              },
              error => {
                console.log(error);
              }
            );
          }
        }
      );
     
      
    }

    private initConfig(): void {
        this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => <ICreateOrderRequest>{
          intent: 'CAPTURE',
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: `${this.total_price}`,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: `${this.total_price}`
                  }
                }
              },
              items: [
                {
                  name: 'Enterprise Subscription',
                  quantity: '1',
                  category: 'DIGITAL_GOODS',
                  unit_amount: {
                    currency_code: 'USD',
                    value: `${this.total_price}`,
                  },
                }
              ]
            }
          ]
        },
        advanced: {
          commit: 'true',
        },
        style: {
          label: 'paypal',
          layout: 'vertical'
        },
        onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then(details => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
            var array: InvoiceModel = new InvoiceModel();
            this._invoiceService.getByIdAccount(this.id_account).then(
            result => {
              console.log(this.id_account);
              array = result as InvoiceModel;
              array[0].status="success";
              console.log(array);
              this._invoiceService.update(array[0]);
            },
            error => {
              console.log( error);
            }
          );

            this._router.navigate(['/']);
          });
        },
        
        onClientAuthorization: (data) => {
          console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        },
        onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
        },
        onError: err => {
          console.log('OnError', err);
        },
        onClick: (data, actions) => {
          console.log('onClick', data, actions);
        },
      };
      }

  
}