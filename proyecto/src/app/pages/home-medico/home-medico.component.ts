import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/model/cita';
import { UsuariosService } from 'src/app/shared/usuarios.service';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit {

 public citas: Cita [] = []
  constructor(public usuarioService:UsuariosService){
    console.log("medico")
    console.log(usuarioService)

    this.citas = [
      new Cita ("Paco", "Pancho","10/11/2020" ,"10:30"),
      new Cita ("Maria", "Calcetines","11/11/2020" ,"11:00"),
      new Cita ("Ester", "Perico","12/11/2020"  ,"11:30"),
      new Cita ("Carlos", "Toby","13/11/2020"  ,"12:00"),
      new Cita ("Marta", "Leo","14/11/2020"  ,"12:30")
    ]
 }

  ngOnInit(): void {
  }

}