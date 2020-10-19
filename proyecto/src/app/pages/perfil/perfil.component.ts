import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { ClienteService } from 'src/app/shared/cliente.service';
import { Persona } from 'src/app/model/persona';
import { Mascota } from 'src/app/model/mascota';
import { MascotaService } from 'src/app/shared/mascota.service';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  public btnCerrar:boolean;
  public nameMascota:string;
  public perfil:Persona;
  public mascotas:Mascota[];
  public perfilMascota:Mascota;

  constructor(public usuarioService:UsuariosService, public clienteService:ClienteService,public mascotaService:MascotaService) { 
    this.perfil=clienteService.buscar(usuarioService.usuario.nameUser);
    this.mascotas=mascotaService.buscarLista(usuarioService.usuario.nameUser);

  }
  ngOnInit(): void {
     
  }

  public verPerfil(pet:Mascota):void{
    this.btnCerrar=true;
    this.perfilMascota=pet;
     
  }

  public cerrar():void{
    this.btnCerrar=false;
     
  }

}
