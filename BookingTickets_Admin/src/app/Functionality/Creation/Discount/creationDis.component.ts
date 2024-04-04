import { formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { Discount } from "src/app/models/discountApi.model";
import { DiscountService } from "src/app/services/discountService";


@Component({
    templateUrl: './creationDis.component.html'
})

export class CreationDisComponent implements OnInit {
    constructor(
        private _DiscountService: DiscountService,
        private _formBuilder: FormBuilder,
        private _router: Router,
    ) {}

    discountForm: FormGroup;

    ngOnInit(): void {
        this.discountForm = this._formBuilder.group({
            content: '',
            status: false,
            price: '',
            dateEnd: ''
        })
    }
    
    save() {
        var discount: Discount = this.discountForm.value as Discount;
        discount.dateEnd = formatDate(discount.dateEnd,"dd/MM/yyyy","en-Us");
        this._DiscountService.addDis(discount).then(
            res=>{
                console.log(res);
                alert("success")
                this._router.navigate(['/viewDis'])
            }, 
            er => {
                console.log(er)
            });
    }
}