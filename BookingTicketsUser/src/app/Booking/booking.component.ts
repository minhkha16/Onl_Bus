import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { formatDate } from "@angular/common";
import { ShippingService } from "../Services/shipping.service";
import { Shipping } from "../Models/shipping.model";
import { Prices } from "../Models/Prices.model";
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { InvoiceShippingService } from "../Services/invoiceShippingService (1)";
import { InvoiceShipping } from "../Models/invoiceShipping.model ";
@Component({
    templateUrl: './booking.component.html'
})

export class BookingComponent implements OnInit {
    constructor(
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _activated: ActivatedRoute,
        private _invoiceShipping: InvoiceShippingService,
        private _shippingService: ShippingService
    ) {}
    bookingForm: FormGroup;
    // detailsForm: FormGroup;
    invoiceShippings: InvoiceShipping[]; 
    shippingForm: FormGroup;
    pay: string;
    wei: number;
    pri: Prices;
    prices: number
    idprice: number;
    shipping: Shipping[];
    pricePakage: number = 0;
    ngOnInit(): void {
      if (sessionStorage.getItem('level') != '2') {
        this._router.navigate(['/'])
      }
        this._shippingService.getAllShipping().then(res=>{
          this.shipping = res as Shipping[];
      },er=>console.log(er))

        this.bookingForm = this._formBuilder.group({
            recipientName : [
              '',
              [
                  Validators.required,
              ],
              ],
            recipientPhone : [
              '',
              [
                  Validators.required,
                  Validators.pattern( '^[0-9\-\+]{9,11}$'),
              ],
              ],
            recipientAddress : [
              '',
              [
                  Validators.required,
              ],
              ],
            deliveryName: [
              '',
              [
                  Validators.required,
              ],
              ],
            deliveryPhone: [
              '',
              [
                  Validators.required,
                  Validators.pattern( '^[0-9\-\+]{9,11}$'),
              ],
              ],
            deliveryAddress: [
              '',
              [
                  Validators.required,
              ],
              ],
            idAccount: '',
            idShipping: '',
            status: false,
            payment: '',
            total: '',
            prices: 0,
            weights: [
              '',
              [
                  Validators.required,
                  Validators.pattern( '([1-9]|[1-9][0-9]|50)'),
              ],
              ],
        })
        
    }

    save() {
        var invoice: InvoiceShipping = this.bookingForm.value as InvoiceShipping;
        invoice.payment = this.pay
        invoice.idShipping = this.idprice
        invoice.total = this.prices
        invoice.idAccount = Number(sessionStorage.getItem('idAccount'));

        console.log(invoice);
        
          this._invoiceShipping.addInvoiceShipping(invoice).then(
            res=>{
                console.log(res);
                alert("Success")
                this._router.navigate(['list'])
            }, 
            er => {
                console.log(er)
            });
        
    }

    weight(a :any) {
        this.wei = a.target.value

        this.prices = this.pricePakage * this.wei
    }

    choosePrice(a: any){
      this.idprice = a.target.value;
      this._shippingService.GetById(this.idprice).then(
        res=>{
            this.pricePakage= Number(res) 
            if(this.prices != null){
              this.prices = this.pricePakage * this.wei
            }
        }, 
        er => {
            console.log(er)
        });
    }

    payments(a :any) {
        console.log(a.target.role);
        this.pay = a.target.role
    }

}