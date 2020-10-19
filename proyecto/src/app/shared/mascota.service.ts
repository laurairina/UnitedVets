import { Injectable } from '@angular/core';
import { Mascota } from '../model/mascota';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  public mascota:Mascota;
  public listaMacota:Mascota[]=[new Mascota("Pepito Miau","12 meses","Apio,Paracetamol","Tania"),new Mascota("Lala Araña","09 meses","cebolla,Ibuprofeno","Tania"),new Mascota("Boa tita","11 meses","Tomate,Ibuprofeno","Paul")];

  constructor() { 
    this.mascota=null;
  }
  
  setUsuario(mascota:Mascota){
    this.mascota=mascota;
  }

  getUsuario(){
    return this.mascota;
  }


  buscarLista(user:string):Mascota[]{
    let pet:Mascota[];

      pet=[];
      for (let i = 0; i < this.listaMacota.length; i++) {
   
        if(this.listaMacota[i].nameP.toLocaleLowerCase()== user.toLocaleLowerCase()){
          console.log(this.listaMacota[i])
          pet.push(this.listaMacota[i]);
        }
        
      }
      return pet; 
  }

}
