import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { InvoiceShippingService } from "../Services/invoiceShippingService (1)";
import { InvoiceShipping } from "../Models/invoiceShipping.model ";
@Component({
    templateUrl: './view.component.html'
})
export class ViewComponent implements OnInit {
    constructor(
        private _invoiceShipping: InvoiceShippingService,
        private _formBuilder: FormBuilder,
        private _router: Router,
    ) {}

    shippings: InvoiceShipping[];
    ngOnInit(): void {
        this.initConfig();
        this._invoiceShipping.getAllShipping().then(
            res=>{
                this.shippings = res as InvoiceShipping[];
            },
                er=>console.log(er)           
            );
    }

    delete(id: number){
        var rv = confirm(`You definitely delete!`);
        if(rv){
            this._invoiceShipping.delete(id).then (
                res => {
                    alert("Succses")
                    this.ngOnInit();
                },err=>{
                    console.log(err);
                }
            )
        }
    }

    prices:number;
    idStatus: number
    buyTotal: number = 0;
    payments: string;
    sum(id: number) {
        this._invoiceShipping.getTotal(id).then(
            res => {
                this.prices = Number(res)
            },err=>{
                console.log(err);
            }
        )
        
        this._invoiceShipping.findAllStatus(id).then(
          res => {
              var rv = res as InvoiceShipping;
              rv.status = true;
              this.payments = rv.payment
              
              this._invoiceShipping.updateShipping(rv).then(res=>{
            })
          },err=>{
              console.log(err);
          }
        )
      
    }

    buy(id: number) {
      var rv = confirm(`You definitely buy order`);
      if(rv) {
        this._invoiceShipping.getTotal(id).then(
          res => {
              this.prices = Number(res)
          },err=>{
              console.log(err);
          }
        )

        this._invoiceShipping.findAllStatus(id).then(
          res => {
              var rv = res as InvoiceShipping;
              rv.status = true;
              console.log("rv", rv);
              
              this._invoiceShipping.updateShipping(rv).then(res=>{
                console.log("updateStatus",res);
                alert("Buy Succses!")
            })
          },err=>{
              console.log(err);
          }
        )
      }
    }
    public payPalConfig?: IPayPalConfig;
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
                value: `${this.prices}`,
                breakdown: {
                  item_total: {
                    currency_code: 'USD',
                    value: `${this.prices}`
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
                    value: `${this.prices}`,
                  },
                }
              ]
            }
          ]
        },
        advanced: {
          commit: 'true'
        },
        style: {
          label: 'paypal',
          layout: 'vertical'
        },
        onApprove: (data, actions) => {
          console.log('onApprove - transaction was approved, but not authorized', data, actions);
          actions.order.get().then(details => {
            console.log('onApprove - you can get full order details inside onApprove: ', details);
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