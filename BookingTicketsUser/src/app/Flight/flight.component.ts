import { Component, OnInit } from "@angular/core";
import { PlaceFrom } from "../Models/placefrom.model";
import { PlaceFromapi } from "../Services/placefromapi.service";
import { Freeway } from "../Models/freeway.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { formatDate } from "@angular/common";

@Component({
    templateUrl: './flight.component.html'
})

export class FlightComponent implements OnInit {
    constructor(
        private placefromapi: PlaceFromapi,
        private formBuilder: FormBuilder
    ){}
    default_value_placeto:string='';
    placeFroms: PlaceFrom[]=[];
    list_placetos: any[] = [];
    idPlacFrom:number=null;
    idPlacTo:number=null;
    list_freeways: Freeway[]=[];
    list_idPlaceto_fromFreeway:number[] =[];
    test:string;
    id_freeway:number=null;
    indexFrom: FormGroup;
    check_freewway:any[]=[];
    allfreeways: any[]=[];
    list_popular_placefrom: any[]=[];
    list_popular_freeway: any[]=[];
    check_list_popular_freeway:any[]=[];
    check_allfreeway: any[]=[];
    array:any[] = [];
    picked_date:string='';
    ngOnInit(): void {
        this.indexFrom = this.formBuilder.group({
            placefrom:'', 
            placeto:'',
            departing:'',
        })
        var freeway_popular =[];
        var a=0;
        this.placefromapi.getPopularFreewaybyIdPlacefrom(1).then(
            result => {
              
                this.check_list_popular_freeway = result as [];
            
             
                console.log(this.check_list_popular_freeway);
                for (var i = 0; i<this.check_list_popular_freeway.length; i++) {
                    if (this.check_list_popular_freeway[i].id!=a) {
                        freeway_popular.push(this.check_list_popular_freeway[i]);
                        a = this.check_list_popular_freeway[i].id;
                    }
                  }
                  this.list_popular_freeway = freeway_popular;
                  console.log(this.list_popular_freeway);
               
               
            },
            error => {  
                console.log(error);
            }
        );
        this.placefromapi.getAllPlaceFrom().then(
            result => {
                this.placeFroms = result as PlaceFrom[];
                var i =1;
                this.placeFroms.forEach(p => {
                    if(i<=5){
                        this.list_popular_placefrom.push(p);
                        i++;
                    }
                   
                });
                console.log(this.list_popular_placefrom);
            },
            error => {
                console.log(error);
            }
        );  
        var array_freeway =[];
        var check = 0;
        this.placefromapi.getAllFreeway().then(
            result => {
              
                this.check_allfreeway = result as [];
             
                // console.log(array_freeway);
                for (var i = 0; i<this.check_allfreeway.length; i++) {
                    if (this.check_allfreeway[i].id!=check) {
                        array_freeway.push(this.check_allfreeway[i]);
                        check = this.check_allfreeway[i].id;

                    }
                  }
                  this.allfreeways = array_freeway;
                // console.log(array_freeway);
               
            },
            error => {  
                console.log(error);
            }
        );
        
        this.list_placetos =[];
        this.list_freeways=[];
      
    }
   
    PlaceFrom(evt: any){
       
        this.list_placetos =[];
        var value = evt.target.value;
        this.indexFrom = this.formBuilder.group({
            placefrom:value, 
            placeto:'',
            departing:'',
        })
        this.placeFroms.forEach(p => {
            if(p.name == value){
                this.idPlacFrom = p.id;
                console.log(this.idPlacFrom);
            }
        });
        this.list_freeways=[];
        this.list_idPlaceto_fromFreeway=[];
        this.test="";
        this.placefromapi.getPlaceTo(this.idPlacFrom).then(
            result => {
                this.list_placetos = result as [];
                console.log(this.list_placetos);
               
            },
            error => {
                console.log(error);
            }
        );
        console.log(this.list_placetos);
    }

    save() {
        
        this.array=[];
        var information = this.indexFrom.value;
        console.log(information.departing);
        if(information.placefrom!='' && information.departing!="") {
            console.log(information);
        console.log("kết quả là"+(information.departing));
        console.log("a:"+((information.departing.toString()).substring(2,3)));
        if((information.departing.toString()).substring(2,3) !="-"){
            information.departing = formatDate(information.departing,"dd-MM-yyyy","EN-US");
        }
        this.picked_date= information.departing ;
        this.placeFroms.forEach(p => {
            if(p.name == information.placeto){
                this.idPlacTo = p.id;
            }
        });
        
        this.placefromapi.checkFreeWay(this.idPlacFrom,this.idPlacTo,information.departing).then(
            result => {
                this.check_freewway = result as [];
                if(this.check_freewway.length>0){
                    this.array.push(this.check_freewway[0]);
                    this.allfreeways = this.array;
                }
                else{
                    this.allfreeways=[];
                }
            },
            error => {
                console.log(error);
            }
        ); 
        }else{
            var array_freeway =[];
            var check = 0;
            this.placefromapi.getAllFreeway().then(
                result => {
                    this.check_allfreeway = result as [];
                    for (var i = 0; i<this.check_allfreeway.length; i++) {
                        if (this.check_allfreeway[i].id!=check) {
                            array_freeway.push(this.check_allfreeway[i]);
                            check = this.check_allfreeway[i].id;  
                        }
                      }
                      this.allfreeways = array_freeway;
                
                   
                },
                error => {  
                    console.log(error);
                }
            );
        }
    }
    choosePopularFreeway(id_popularplacefrom:any){
        var freeway_popular_click =[];
        var a=0;
        this.placefromapi.getPopularFreewaybyIdPlacefrom(id_popularplacefrom).then(
            result => {
              
                this.check_list_popular_freeway = result as [];
            
             
                console.log(this.check_list_popular_freeway);
                for (var i = 0; i<this.check_list_popular_freeway.length; i++) {
                    if (this.check_list_popular_freeway[i].id!=a) {
                        freeway_popular_click.push(this.check_list_popular_freeway[i]);
                        a = this.check_list_popular_freeway[i].id;
                    }
                  }
                  this.list_popular_freeway = freeway_popular_click;
                  console.log(this.list_popular_freeway);
               
               
            },
            error => {  
                console.log(error);
            }
        );
    }
}