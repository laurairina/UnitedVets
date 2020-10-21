import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { ClienteService } from 'src/app/shared/cliente.service';

import { Mascota } from 'src/app/model/mascota';
import { MascotaService } from 'src/app/shared/mascota.service';
import { User } from 'src/app/model/user';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public btnCerrar: boolean;
  public nameMascota: string;
  public perfil: User;
  public mascotas: Mascota[];
  public perfilMascota: Mascota;


  constructor(public usuarioService: UsuariosService, public clienteService: ClienteService, public mascotaService: MascotaService, private rutaActiva: ActivatedRoute) {
    if(this.usuarioService.userActual!=null){
      console.log("Perfil de usuario Pasado  ");
       this.perfil=this.usuarioService.userActual;
       this.mascotas = this.mascotaService.buscarLista(this.perfil.nombre_usuario);//this.usuarioService.usuario.nombre_usuario);


    }
    else{
      console.log("Perfil de usuario logueado")
      this.usuarioService.userActual=null;
      this.mostrarUsuario(this.usuarioService.usuario.nombre_usuario);

    }
  }
  ngOnInit(): void {

  }


  public mostrarUsuario(nombre: string) {
    this.usuarioService.obtenerUsuario(nombre)
      .subscribe((data: User) => {
        console.log("Perfil")
        this.perfil = data[0];
        this.mascotas = this.mascotaService.buscarLista(this.perfil.nombre_usuario);//this.usuarioService.usuario.nombre_usuario);

        console.log(this.perfil)
      });
  }
  public verPerfil(pet: Mascota): void {
    this.btnCerrar = true;
    this.perfilMascota = pet;

  }

  public cerrar(): void {
    this.btnCerrar = false;

  }

}
