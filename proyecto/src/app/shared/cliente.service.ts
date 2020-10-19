import { Injectable } from '@angular/core';
import { Persona } from '../model/persona';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
 
  public cliente:Persona;
  public listaPersona:Persona[]=[new Persona("Tania", "509230671","nancy@gmail.com","12345678","Av. America 51"),new Persona("Paul", "439230671","paul@gmail.com","22345678","Av. America 42"),new Persona("Daniel", "119230671","dani@gmail.com","66345678","Av. America 57"),new Persona("Laura", "719230671","laura@gmail.com","71345678","Av. America 71")]
  constructor() {
    this.cliente=null;
  }
   
  setUsuario(cliente:Persona){
    this.cliente=cliente;
  }

  getUsuario(){
    return this.cliente;
  }

  buscar(usuario:string):Persona{
    let user:Persona;
    let i:number=0;
    let encontrado:boolean;

      while(i<this.listaPersona.length && !encontrado){
        if(this.listaPersona[i].name.toLocaleLowerCase()== usuario.toLocaleLowerCase()){
           user=this.listaPersona[i];
           encontrado=true;
        }
        i++;
      }
      return user; 
  }

}
