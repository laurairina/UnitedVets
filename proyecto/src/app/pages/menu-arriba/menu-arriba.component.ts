import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';

@Component({
  selector: 'app-menu-arriba',
  templateUrl: './menu-arriba.component.html',
  styleUrls: ['./menu-arriba.component.css']
})
export class MenuArribaComponent implements OnInit {
  
  public rol:string;
  constructor(public usuarioService:UsuariosService) { 
  }

  ngOnInit(): void {
  }

}
