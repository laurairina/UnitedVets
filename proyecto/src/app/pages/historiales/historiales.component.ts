import { Component, OnInit } from '@angular/core';
import { Data, ActivatedRoute } from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { Historial } from 'src/app/model/historial';
import { HistorialService } from 'src/app/shared/historial.service';
import { UsuariosService } from 'src/app/shared/usuarios.service';



@Component({
  selector: 'app-historiales',
  templateUrl: './historiales.component.html',
  styleUrls: ['./historiales.component.css']
})
export class HistorialesComponent implements OnInit {

  
  public fromDate:string;
  public fecha:string;
  public nombreP:string;
  public nombreM:string;
  public nombreCB:string;
  public nombreMB:string;
  public tratamiento:string;
  public ananmnesis:string;
  public editBoton:boolean;

  public opciones:string[] = [];


  
  private _success = new Subject<string>();
  public successMessage:string;
  staticAlertClosed = false;

  constructor(public usuarioService:UsuariosService,private rutaActiva: ActivatedRoute, private historialService: HistorialService) { 
    this.successMessage = '';
    if(this.usuarioService.usuario.rol!="Cliente"){
      console.log("historial pasado")
      console.log(this.historialService.historial);
       let historial:Historial;
       historial=this.historialService.historial;
       this.nombreP = historial.nombreP;
       this.nombreM = historial.nombreM;
       this.ananmnesis = historial.anamnesis;
       this.tratamiento = historial.tratamiento;
       this.fecha = historial.fecha;

       this.historialService.historialesIdUsuario(historial.usuario_id) 
       .subscribe((data: Historial[]) => {
         this.historialService.historialesCliente = data;
         for (let index = 0; index < this.historialService.historialesCliente.length; index++) {
           this.opciones.push(this.historialService.historialesCliente[index].nombreM);
         }
         console.log(data)
       });
    }
    else{
      console.log("historial de rol cliente")
      let usuariCliente=this.usuarioService.usuario;
      this.nombreP = usuariCliente.nombre;
      this.historialService.historialesIdUsuario(usuariCliente.id) 
      .subscribe((data: Historial[]) => {
        this.historialService.historialesCliente = data;
        for (let index = 0; index < this.historialService.historialesCliente.length; index++) {
          this.opciones.push(this.historialService.historialesCliente[index].nombreM);
        }
        console.log(data)
      });
    }

  
  }

  ngOnInit(): void {

    this.rutaActiva.params.subscribe(routeParams => {
   
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
    // this.onDateSelect(this.fromDate);
    // this.nombreC=this.nombreCB;
    // this.nombreM=this.nombreMB;
    console.log(this.fecha)
    let historial:Historial;  
    this.historialService.historial=  this.historialService.buscarFecha(this.fecha, this.nombreM);

    this.ananmnesis = this.historialService.historial.anamnesis;
    this.tratamiento = this.historialService.historial.tratamiento;
   }

  anadir(){
    this.changeSuccessMessage("Guardados");
     console.log(this.ananmnesis +"   "+this.tratamiento)
  }

  modificar(){
    this.historialService.historial.anamnesis= this.ananmnesis;
    this.historialService.historial.tratamiento= this.tratamiento;

    this.historialService.modificarHistorial(this.historialService.historial)
    .subscribe((data: any) => {
      if (data.affectedRows >= 1) {
        console.log("Usuario modificado");
        this.changeSuccessMessage("Modificado Datos");
      }
      else {
        console.log("No se ha modificado usuario");
        this.changeSuccessMessage("No se ha Modificado");
      }
    });
    

  }


  public changeSuccessMessage(mensaje:string) {
    this._success.next(`Datos `+mensaje);
  }


}
