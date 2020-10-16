import { Component, OnInit} from '@angular/core';
import { Cita } from 'src/app/model/cita';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

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
  closeResult = '';
  private _success = new Subject<string>();
  public successMessage:string;
  staticAlertClosed = false;
  public opciones:string[] = [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30'
  ];
  public opcionS:string;
  public nombreC:string;
  public apellidoC:string;
  public dniC:string;
  public nombreM:string;
  public fechaC:string;
  public editBoton:boolean;

  constructor(private modalService: NgbModal) {
    this.citas=[new Cita("Pepe","cita01","01/20/2020","9:00"),new Cita("Tania","cita02","25/10/2020","14:30") , new Cita("Paul","cita03","05/11/2020","12:30"),new Cita("Tania","cita04","01/12/2020","16:00")];
    this.collectionSize=this.citas.length;
    this.refreshCountries();
    this.successMessage = '';
   }

  ngOnInit(): void {
    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  refreshCountries() {
    this.citas
      .map((f, i) => ({id: i + 1, ...f}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  anadir(){

    this.changeSuccessMessage("añadido");
  }

  buscar(){

  }

   
   confirmar()
   {
     confirm("¿Desea borrar el usuario X?")
   }

   open(content,valor:string,cita:Cita) {
     console.log(cita);
     if(valor=="anadir"){
      this.opcionS="";
      this.nombreC="";
      this.apellidoC="";
      this.dniC="";
      this.nombreM="";
      this.fechaC="";
      this.editBoton=false;
     }
     else{
      this.nombreC=cita.nombre;
       this.editBoton=true;
     }
    

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass: 'dark-modal'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  editar(){
    this.changeSuccessMessage("Modificado "+this.nombreC);

  }

  public changeSuccessMessage(mensaje:string) {
    this._success.next(`Datos `+mensaje);
  }
}
