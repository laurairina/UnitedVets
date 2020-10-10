import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';

@Component({
  selector: 'app-home-medico',
  templateUrl: './home-medico.component.html',
  styleUrls: ['./home-medico.component.css']
})
export class HomeMedicoComponent implements OnInit {

  constructor(public usuarioService:UsuariosService){
    console.log("medico")
    console.log(usuarioService)
 }

  ngOnInit(): void {
  }

}
