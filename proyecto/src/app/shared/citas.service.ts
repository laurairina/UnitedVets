import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
import { Cita } from '../model/cita';
 
@Injectable({
  providedIn: 'root'
})
export class CitasService {
 
  public cita:Cita;
  private url= "http://localhost:3000/";
  constructor(private http: HttpClient) { 
 
    this.cita=null;
  }
 
  //mostrar todas las citas 
  
 
  getCitas(id:number){
    return this.http.get(this.url+"citas/?idMedico="+id);
  }
 
  
  getTodasCitas(){
    return this.http.get(this.url + "citas");
  }
  
  
  actualizarCita(cambio:Cita){
    return this.http.put(this.url + "citas", cambio);
   }
   
   
   insertarCita(nuevaCita:Cita){
     return this.http.post(this.url + "citas",nuevaCita); 
    //return this.http.post(this.url+"mascotaId",httpOptions)  
    }
 
buscaIdMascota(dni:string, mascota:string)
{
  let httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),dni,mascota
  };
 
 return this.http.post(this.url+"mascotaId",httpOptions)  
}
// buscaIdMascota(buscar:string[]){
  setUsuario(cita:Cita){
    this.cita=cita;
  }
 
  buscar(usuario:string):User{
    let user:User;
    let i:number=0;
    let encontrado:boolean;
 
      return user; 
  }


 
  obtenerListaPaciente(nombre:string){
    return this.http.get(this.url +"citas/listaPacientes/?name="+ nombre);
  }
 
  obtenerUsuarios(){
    return this.http.get(this.url);
  }
 
  insertarUsuario(use:User){
     return this.http.post(this.url,use);
  }
 
  actualizarUsuario(use:User){
   return this.http.put(this.url, use);
  }
 
  borrarUsuario(id:User){
    return this.http.delete(this.url +"citas?id="+id);
  }
}