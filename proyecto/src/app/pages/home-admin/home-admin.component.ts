import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  constructor(public usuarioService:UsuariosService) { 
    console.log("admin")
    console.log(usuarioService)
  }

  ngOnInit(): void {
  }

}
