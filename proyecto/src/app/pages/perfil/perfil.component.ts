import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { ClienteService } from 'src/app/shared/cliente.service';
import { Persona } from 'src/app/model/persona';
import { Mascota } from 'src/app/model/mascota';
import { MascotaService } from 'src/app/shared/mascota.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public btnCerrar:boolean;
  public nameMascota:string;
  public perfil:User;
  public mascotas:Mascota[];
  public perfilMascota:Mascota;


  constructor(public usuarioService:UsuariosService, public clienteService:ClienteService,public mascotaService:MascotaService) { 
     this.mostrarUsuario(usuarioService.usuario.nombre_usuario);
    this.mascotas=mascotaService.buscarLista(usuarioService.usuario.nombre_usuario);


  }
  ngOnInit(): void {

   
  }
 
  
  public mostrarUsuario(nombre:string){
    this.usuarioService.obtenerUsuario(nombre)
    .subscribe((data:User)=>{
      this.perfil=data[0];
      console.log(this.perfil)
    });
  }
  public verPerfil(pet:Mascota):void{
    this.btnCerrar=true;
    this.perfilMascota=pet;
     
  }

  public cerrar():void{
    this.btnCerrar=false;
     
  }

}
