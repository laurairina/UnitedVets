import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  constructor(public usuarioService:UsuariosService) { }

  ngOnInit(): void {
  }

}