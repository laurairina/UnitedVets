import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  public usuario:User;
  public lista:User[]=[new User(1,"dani","dani01", "Admin" ),new User(2,"tania","tania01", "Cliente" ),new User(3,"paul","paul01", "Cliente"), new User(4,"laura","laura01", "Medico" )];
  constructor() { 

    this.usuario=null;
  }

  buscar(usuario:string):User{
    let user:User;
    let i:number=0;
    let encontrado:boolean;

      while(i<this.lista.length && !encontrado){
        if(this.lista[i].nameUser== usuario){
           user=this.lista[i];
           this.usuario=this.lista[i];
           encontrado=true;
        }
        i++;
      }
      return user; 
  }
}
