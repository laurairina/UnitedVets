import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mascota } from '../../model/mascota';
import { Persona } from './../../model/persona';
import { Historial } from 'src/app/model/historial';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { ClienteService } from 'src/app/shared/cliente.service';
import { MascotaService } from 'src/app/shared/mascota.service';
import { HistorialService } from 'src/app/shared/historial.service';

@Component({
  selector: 'app-pre-historial',
  templateUrl: './pre-historial.component.html',
  styleUrls: ['./pre-historial.component.css']
})
export class PreHistorialComponent implements OnInit {

  public historiales: Historial [] = []
  
  constructor(public usuarioService:UsuariosService,private router: Router, private clienteService: ClienteService, private mascotaService: MascotaService, private historialService: HistorialService) { 

    console.log("medico")
    console.log(usuarioService)
     
    this.historiales = this.historialService.historiales
  }

  ngOnInit(): void {
  }

  verHistorial(codigo:string)
  {
    this.router.navigateByUrl('/historiales/' + codigo)
  }

  buscarCliente(nombre:HTMLInputElement)
  {
    let clientesFiltrados: Historial [] = []
    
    for(let i: number = 0; i< this.historiales.length; i++)
    {
      if(this.historiales[i].mascota.nameP === nombre.value)
      {
        clientesFiltrados.push(this.historiales[i])
      }
    }

    this.historiales = clientesFiltrados

    if (this.historiales.length === 0)
      {
        this.historiales = this.historialService.historiales
      }  
  }
}
