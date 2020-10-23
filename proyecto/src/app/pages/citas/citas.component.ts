import { Component, OnInit} from '@angular/core';
import { Cita } from 'src/app/model/cita';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { CitasService } from 'src/app/shared/citas.service';
import { UsuariosService } from 'src/app/shared/usuarios.service';
// import { threadId } from 'worker_threads';
 
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
  public apellidosC:string;
  public dniC:string;
  public nombreM:string;
  public fechaC:string;
  public editBoton:boolean;
  public btnEdit:boolean;
  public citasEdit:Cita;
  public citaNueva:Cita;
  public dniCN:string;
  public nombreMN:string;
  constructor(private modalService: NgbModal, public citaServicio: CitasService ,public usuarioService:UsuariosService) {
  
     
  //  this.usuarioService.loguearse(this.usuario,this.password)
  //  .subscribe((data:User)=>{
 
  // });
 
 this.citaServicio.getCitas(this.usuarioService.getUsuario().id)
   .subscribe((data:Cita[])=>{
    this.citas=data;   
    this.collectionSize=this.citas.length;
    this.refreshCountries();
    this.successMessage = '';
 });
 
   // this.citas=[new Cita(1,"fecha","hora",2,6),new Cita(2,"fecha","hora",2,7) , new Cita(2,"fecha","hora",2,8),new Cita(2,"fecha","hora",2,9)];
   
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
     this.apellidosC="";
     this.dniC="";
     this.nombreM="";
     this.fechaC="";
     this.editBoton=false;
     this.btnEdit=false;
     this.citasEdit=null;
     let idVet = this.usuarioService.getUsuario().id;
     this.citaNueva = new Cita(0,null,null,null,null,idVet, 0,null);
     this.dniCN="";
     this.nombreMN = "";
    }
    else{
      this.nombreC=cita.nombreP;
      this.apellidosC=cita.nombre;
      this.fechaC=cita.fecha;
      this.opcionS=cita.hora;
      this.citasEdit=cita;
      this.editBoton=true;
      this.btnEdit=true;
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
    let citaA= new Cita(this.citasEdit.id,this.citasEdit.mascota_id,this.citasEdit.nombre,this.fechaC,this.opcionS,this.citasEdit.vet_id,this.citasEdit.cita_id,this.citasEdit.nombreP)
   console.log(this.nombreC + this.apellidosC +this.fechaC+this.opcionS);
       this.citaServicio.actualizarCita(citaA)
   .subscribe((data:any)=>{
    if(data.affectedRows>=1){
     this.changeSuccessMessage("Modificado "+ this.nombreC);
    }
 });

   }
  
 

   anadir(){
     this.citaServicio.buscaIdMascota(this.dniCN,this.nombreMN)
     .subscribe((data:number)=>{  
       this.citaNueva.mascota_id = data[0].id;
       this.citaServicio.insertarCita(this.citaNueva)
      .subscribe((data:any)=>{
       if(data.affectedRows>=1){
         this.changeSuccessMessage("Cita añadida con Exito "+ this.nombreC);
       }
     
    });
       
      });   
     
 }

    

 public changeSuccessMessage(mensaje:string) {
   this._success.next(`Datos `+mensaje);
 }
}