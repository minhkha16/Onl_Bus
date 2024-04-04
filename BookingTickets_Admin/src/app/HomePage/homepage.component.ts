import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    templateUrl: './homepage.component.html'
})

export class HomepageComponent implements OnInit{
    constructor(
        private _router: Router
        ){}
        check: string;
    ngOnInit(): void {
        this.check = localStorage.getItem('email');
        if(this.check == null){
            this._router.navigate(['/background/login']);
        }
    }
    checkout(){
        localStorage.removeItem('email');
        this._router.navigate(['/background/login']);
    }
}

