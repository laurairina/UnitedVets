import { Injectable } from '@angular/core';
import { Historial } from '../model/historial';
import { ClienteService } from './cliente.service';
import { MascotaService } from './mascota.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {

  public historial: Historial;
  public historiales: Historial [];
  public historialesCliente: Historial [];

  private url= "http://localhost:3000/";
  constructor(private clienteService: ClienteService,private mascotaService: MascotaService,private http: HttpClient) 
  {
    this.historial = null;
    this.historiales=[];
    this.historialesCliente=[];
  }

  public buscar(codigo:string):Historial{

    let hist:Historial;
    let i:number=0;
    let encontrado:boolean;

      while(i<this.historiales.length && !encontrado){
        if(this.historiales[i].hist_id.toLocaleLowerCase()== codigo.toLocaleLowerCase()){
           hist=this.historiales[i];
           encontrado=true;
        }
        i++;
      }
      return hist; 
  }

  public buscarFecha (fecha:string, nombreM:string): Historial
  {
    let hist:Historial;
    let i:number=0;
    let encontrado:boolean=false;

      while(i<this.historialesCliente.length && !encontrado){
        console.log(this.historialesCliente[i].fecha +this.historialesCliente.length+"=="+ fecha+" "+nombreM)
        if(this.historialesCliente[i].fecha === fecha && this.historialesCliente[i].nombreM === nombreM){
          hist=this.historialesCliente[i];
           encontrado=true;
          console.log("anamesis   "+ hist.anamnesis)
        }
        i++;
      }
      return hist; 
  }
  


  obtenerHistoriales(){
    return this.http.get(this.url+"historial");
  }

  modificarHistorial(historial:Historial){
    return this.http.put(this.url+"historial", historial);
  }

  historialesIdUsuario(id:number){ 

    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),id
    };
   
   return this.http.post(this.url+"historial/id",httpOptions)  
  }

}
