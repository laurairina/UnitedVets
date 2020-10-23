import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Persona } from '../model/persona';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
 
  public cliente:Persona;
  private url= "http://localhost:3000/";
  public listaPersona:Persona[]=[new Persona("Tania","Morales","Negrete","1991/10/01", "509230671","tania@gmail.com","12345678","Av. America 51"),new Persona("Paul","Musenan", "","1991/10/01", "439230671","paul@gmail.com","22345678","Av. America 42"),new Persona("Daniel","Vera","Montelongo","1991/10/01", "119230671","dani@gmail.com","66345678","Av. America 57"),new Persona("Laura", "Morales","Morales","1991/10/01","719230671","laura@gmail.com","71345678","Av. America 71")]
  constructor(private http: HttpClient) {
    this.cliente=null;
  }
   
  setUsuario(cliente:Persona){
    this.cliente=cliente;
  }

  getUsuario(){
    return this.cliente;
  }

  // buscar(usuario:string):Persona{
  //   let user:Persona;
  //   let i:number=0;
  //   let encontrado:boolean;

  //     while(i<this.listaPersona.length && !encontrado){
  //       if(this.listaPersona[i].name.toLocaleLowerCase()== usuario.toLocaleLowerCase()){
  //          user=this.listaPersona[i];
  //          encontrado=true;
  //       }
  //       i++;
  //     }
  //     return user; 
  // }

  putCliente(use:User){
    return this.http.put(this.url+"cliente", use);
   }

}
