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
      new Cita (1,"Paco", "Pancho", "10:30"),
      new Cita (2,"Maria", "Calcetines", "11:00"),
      new Cita (3,"Ester", "Perico", "11:30"),
      new Cita (4,"Carlos", "Toby", "12:00"),
      new Cita (5,"Marta", "Leo", "12:30")
    ]
 }

  ngOnInit(): void {
  }

}
