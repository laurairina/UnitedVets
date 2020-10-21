import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/model/cita';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit {

 public citas: Cita [] = []
  constructor(public usuarioService:UsuariosService, private router: Router){
    console.log("medico")
    console.log(usuarioService)

    this.citas = [
      new Cita ("Tania", "Pancho","10/11/2020" ,"10:30"),
      new Cita ("Maria", "Calcetines","11/11/2020" ,"11:00"),
      new Cita ("Paul", "Perico","12/11/2020"  ,"11:30"),
      new Cita ("Tania", "Toby","13/11/2020"  ,"12:00"),
      new Cita ("Maria", "Leo","14/11/2020"  ,"12:30")
    ]
 }

  ngOnInit(): void {
  }

  public mostrarPerfil(cita:Cita){
    this.usuarioService.userActual=null;

    this.usuarioService.obtenerUsuario("Tania")
    .subscribe((data: User) => {
      console.log("Perfil a pasar")
      console.log(data[0]);
      this.usuarioService.userActual = data[0];
      this.router.navigateByUrl('/perfil/actual');
    });


  
  }


}