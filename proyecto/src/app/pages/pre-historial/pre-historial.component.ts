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
    this.historialService.historial=null;
    console.log("PreHistoriales")
    this.historialService.obtenerHistoriales()
    .subscribe((data: Historial[]) => {
      this.historialService.historiales = data;
     this.historiales =this.historialService.historiales;
      console.log(data)
    });
  
  }

  ngOnInit(): void {
  }

  verHistorial(historial:Historial)
  {
    this.historialService.historial=historial;
    console.log(historial);
    this.router.navigateByUrl('/historiales/')
  }

  buscarCliente(nombre:string)
  {
    let clientesFiltrados: Historial [] = []
    
    for(let i: number = 0; i< this.historiales.length; i++)
    {
      if(this.historiales[i].nombreP === nombre)
      {
        clientesFiltrados.push(this.historiales[i])
      }
    }


    console.log("******  "+nombre)
    console.log(clientesFiltrados)
    if (clientesFiltrados.length!=0)
      {
        this.historiales = clientesFiltrados
        console.log("******  si")
      }
      else{
        this.historiales = this.historialService.historiales
        console.log("******  no")
      }  
  }
}
