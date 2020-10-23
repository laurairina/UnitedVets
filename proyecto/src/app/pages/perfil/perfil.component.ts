import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { ClienteService } from 'src/app/shared/cliente.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ValidatorFn, AbstractControl} from '@angular/forms';

import { Mascota } from 'src/app/model/mascota';
import { MascotaService } from 'src/app/shared/mascota.service';
import { User } from 'src/app/model/user';
import { Subject } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { Persona } from 'src/app/model/persona';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./perfil.component.css'],
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class PerfilComponent implements OnInit {

  closeResult = '';
  private _success = new Subject<string>();
  public btnCerrar: boolean;
  public nameMascota: string;
  public perfil: User;
  public mascotas: Mascota[];
  public perfilMascota: Mascota;


  public nombre:string;
  public apellido1:string;
  public apellido2:string;
  public fecha:string;
  public email:string;
  public telefono:string;
  public direccion:string;
  public dni:string;
  public tipoDeUsuario:string;
  public usuario:string;
  public password1:string;
  public password2:string;
  public foto:Blob;
  public rol:string;

  constructor(public usuarioService: UsuariosService, public clienteService: ClienteService, public mascotaService: MascotaService, private rutaActiva: ActivatedRoute, private modalService: NgbModal ) {
    if(this.usuarioService.userActual!=null){
      console.log("Perfil de usuario Pasado  ");
       this.perfil=this.usuarioService.userActual;
       this.mascotaService.obtenerMascotas(this.perfil.id).subscribe((data:Mascota[])=>{
        this.mascotas=data;
        console.log(this.mascotas)
      });


    }
    else{
      console.log("Perfil de usuario logueado")
      this.usuarioService.userActual=null;
      this.mostrarUsuario(this.usuarioService.usuario.nombre_usuario);

    }
  }
  ngOnInit(): void {

  }

  


  public mostrarUsuario(nombre: string) {
    this.usuarioService.obtenerUsuario(nombre)
      .subscribe((data: User) => {
        console.log("Perfil")
        this.perfil = data[0];
        this.mascotaService.obtenerMascotas(this.perfil.id).subscribe((data:Mascota[])=>{
          this.mascotas=data;
          console.log(this.mascotas)
        });

        console.log(this.perfil)
      });
  }
  public verPerfil(pet: Mascota): void {
    this.btnCerrar = true;
    this.perfilMascota = pet;

  }

  public cerrar(): void {
    this.btnCerrar = false;

  }

  open(content,perfil:User) {

    this.email=perfil.email
    this.telefono=perfil.telefono
    this.direccion=perfil.direccion
    this.password1=perfil.password


    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'dark-modal' }).result.then((result) => {
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

  actualizarUsuario()
  {
    this.perfil.password=this.password1
    this.perfil.email=this.email
    this.perfil.telefono=this.telefono
    this.perfil.direccion=this.direccion

    this.clienteService.putCliente(this.perfil).subscribe((data:any)=>
    {
      console.log("datos" + this.password1 + this.email+ this.telefono+ this.direccion)
      console.log(this.perfil)
    
      

      console.log("Modificando perfil")
      console.log(data)
    
    })
    
  }


  guardar() {

    this.changeSuccessMessage("Guardados");

  }
  public changeSuccessMessage(mensaje: string) {
    this._success.next(`Datos ` + mensaje);
  }



  

  public modificarMascota (alergia:string)
  {
    this.mascotaService.putMascota(alergia,this.perfilMascota.id).subscribe((data:any)=>{
     
      console.log(data)
    });

    
  };
  
}
