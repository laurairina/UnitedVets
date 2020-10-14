import { Component, OnInit } from '@angular/core';
import { Cita } from 'src/app/model/cita';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.css']
})
export class CitasComponent implements OnInit {
  public fromDate:string;
  public fecha:string;
  public citas:Cita[];
  page = 1;
  pageSize = 4;
  collectionSize:number;

  constructor() {
    this.citas=[new Cita("Pepe","cita01","01/20/2020"),new Cita("Tania","cita02","25/10/2020") , new Cita("Paul","cita03","05/11/2020"),new Cita("Tania","cita04","01/12/2020")];
    this.collectionSize=this.citas.length;
    this.refreshCountries();
   }

  ngOnInit(): void {
  }

  refreshCountries() {
    this.citas
      .map((f, i) => ({id: i + 1, ...f}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  anadir(){

  }

  buscar(){

  }

  editar(){

  }

   eliminar(){

   }

}
