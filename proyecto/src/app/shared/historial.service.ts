import { Injectable } from '@angular/core';
import { Historial } from '../model/historial';
import { ClienteService } from './cliente.service';
import { MascotaService } from './mascota.service';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  public historial: Historial
  public historiales: Historial [] = [
    new Historial ("Histo01","El perro tiene fiebre", "Medicación cada 8 horas", this.mascotaService.listaMacota[0], "2020-03-20"),
    new Historial ("Histo04","El perro tiene la pata rota", "Vendaje y reposo", this.mascotaService.listaMacota[0], "2020-03-21"),
    new Historial ("Histo02","El perro tiene pulgas", "Champú anti pulgas", this.mascotaService.listaMacota[1], "2020-04-22"),
    new Historial ("Histo03","El perro tiene rabia", "Eutanasia", this.mascotaService.listaMacota[2], "2020-07-15")
  ]
  constructor(private clienteService: ClienteService,private mascotaService: MascotaService) 
  {
    this.historial = null
  }

  public buscar(codigo:string):Historial{

    let hist:Historial;
    let i:number=0;
    let encontrado:boolean;

      while(i<this.historiales.length && !encontrado){
        if(this.historiales[i].codigo.toLocaleLowerCase()== codigo.toLocaleLowerCase()){
           hist=this.historiales[i];
           encontrado=true;
        }
        i++;
      }
      return hist; 
  }

  public buscarFecha (fecha:string,nombreM: string, nombreP:string): Historial
  {
    let hist:Historial;
    let i:number=0;
    let encontrado:boolean;

      while(i<this.historiales.length && !encontrado){
        if(this.historiales[i].fecha == fecha && this.historiales[i].mascota.nameM == nombreM && this.historiales[i].mascota.nameP == nombreP ){
           hist=this.historiales[i];
           encontrado=true;
        }
        i++;
      }
      return hist; 
  }
  

}
