import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UsuariosService } from 'src/app/shared/usuarios.service';

@Component({
  selector: 'app-lista-clientes',
  templateUrl: './lista-clientes.component.html',
  styleUrls: ['./lista-clientes.component.css']
})
export class ListaClientesComponent implements OnInit {

  public usuario:string;
  usuarios: User [] = []
  constructor(public usuarioService:UsuariosService,private router: Router) 
  {
  
    
  }

  ngOnInit(): void {
  }

  public enviar():void{

    this.router.navigateByUrl('/perfil/:rol') 

  }
}