import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class CitasService {


  public usuario:User;
  private url= "http://localhost:3000/citas";
  constructor(private http: HttpClient) { 

    this.usuario=null;
  }

  setUsuario(usuario:User){
    this.usuario=usuario;
  }

  getUsuario(){
    return this.usuario;
  }

  buscar(usuario:string):User{
    let user:User;
    let i:number=0;
    let encontrado:boolean;

      return user; 
  }



  obtenerListaPaciente(nombre:string){
    return this.http.get(this.url +"/listaPacientes/?name="+nombre);
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
    return this.http.delete(this.url +"/?id="+id);
  }
}
