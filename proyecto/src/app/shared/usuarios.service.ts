import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public usuario:User;
  private url= "http://localhost:3000/usuario";
  //public lista:User[]=[new User(1,"dani","dani01", "Admin" ),new User(2,"tania","tania01", "Cliente" ),new User(3,"paul","paul01", "Cliente"), new User(4,"laura","laura01", "Medico" )];
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

     /* while(i<this.lista.length && !encontrado){
        if(this.lista[i].nameUser== usuario){
           user=this.lista[i];
           this.usuario=this.lista[i];
           encontrado=true;
        }
        i++;
      } */ 
      console.log (this.obtenerUsuario(usuario));
      return user; 
  }



  obtenerUsuario(nombre:string){
    return this.http.get(this.url +"/?nombre="+nombre);
  }

  //todos los usuarios sin excepcion
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

  loguearse(nombre:string, passw:string)
  {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),nombre,passw
    };
   

   return this.http.post(this.url+"/datos",httpOptions)
  
  }

}
