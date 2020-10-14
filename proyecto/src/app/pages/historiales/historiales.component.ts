import { Component, OnInit } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';



@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent implements OnInit {

  
  public fromDate:string;
  public fecha:string;
  public nombreC:string;
  public nombreM:string;
  public nombreCB:string;
  public nombreMB:string;
  public tratamiento:String;
  public diagnostico:string;
  public editBoton:boolean;

  
  private _success = new Subject<string>();
  public successMessage:string;
  staticAlertClosed = false;

  constructor(private rutaActiva: ActivatedRoute) { 
    this.successMessage = '';
  }

  ngOnInit(): void {

    this.rutaActiva.params.subscribe(routeParams => {
       if(routeParams.valor =="buscar"){
          this.editBoton=true;
       }
       else{
        this.editBoton=false;
        this.fromDate="";
        this.fecha="";
        this.nombreC="";
        this.nombreM="";
        this.nombreCB="";
        this.nombreMB="";
        this.tratamiento="";
        this.diagnostico="";
       }
   
    });

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');

  }

  onDateSelect(event) {
    let year = event.year;
    let month = event.month <= 9 ? '0' + event.month : event.month;;
    let day = event.day <= 9 ? '0' + event.day : event.day;;
    this.fecha = year + "-" + month + "-" + day;
  
    
   }

  buscar(){
    this.onDateSelect(this.fromDate);
    this.nombreC=this.nombreCB;
    this.nombreM=this.nombreMB;
     console.log(this.nombreCB)
   }

  anadir(){
    this.changeSuccessMessage("Guardados");
     console.log(this.diagnostico +"   "+this.tratamiento)
  }

  modificar(){
    this.changeSuccessMessage("Modificados");
  }
  public changeSuccessMessage(mensaje:string) {
    this._success.next(`Datos `+mensaje);
  }


}
