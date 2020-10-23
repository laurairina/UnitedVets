import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  public mascota:Mascota;
  public listaMacota:Mascota[]=[new Mascota(1,"Pepito Miau","461646","Gato","Común Europeo",3,"2018-03-22","No tiene"),new Mascota(2,"Pancho","461646","Perro","Labrador",4,"2018-03-22","No tiene"),new Mascota(3,"Pedrín","461646","Gato","Común Europeo",3,"2016-03-3","A la gente mala")];
  
  private url= "http://localhost:3000/";
  constructor(private http: HttpClient) { 
    this.mascota=null;
  }
  
  setUsuario(mascota:Mascota){
    this.mascota=mascota;
  }

  getUsuario(){
    return this.mascota;
  }


  postMascota(nuevaMascota:Mascota)
  {
  
    return this.http.post( this.url + "mascota", nuevaMascota )
  }

  obtenerMascota(id:number)
  {
    return this.http.get(this.url + "mascota/?usuario_id=" + id )
  }

  putMascota(alergia:string,id:number)
  {
    
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),alergia,id
    };
   
   
    console.log(httpOptions);
    return this.http.put(this.url+"mascota",httpOptions) 
  }
}
