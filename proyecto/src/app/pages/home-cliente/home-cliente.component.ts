import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.component.html',
  styleUrls: ['./home-cliente.component.css']
})
export class HomeClienteComponent implements OnInit {

  constructor(public usuarioService:UsuariosService){
    console.log("cliente");
    console.log(usuarioService)
 }

  ngOnInit(): void {
  }

}
