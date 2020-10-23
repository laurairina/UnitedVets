import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { User } from 'src/app/model/user';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home-admin.component.css'],
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
export class HomeAdminComponent implements OnInit {

  closeResult = '';
  public usuarios: User[];
  private _success = new Subject<string>();
  public successMessage: string;
  staticAlertClosed = false;
  public nombre:string;
  public apellido1:string;
  public apellido2:string;
  public fecha:string;
  public email:string;
  public telefono:string;
  public direccion:string;
  public dni:string;
  public user:User;

  constructor(public usuarioService: UsuariosService, private modalService: NgbModal) {
    console.log("admin")
    console.log(usuarioService.usuario);
    this.successMessage = '';
    this.usuarioService.obtenerUsuarios()
      .subscribe((data: User[]) => {
        this.usuarios = data;
        console.log("Todos los usuarios guardados")
      });

  }

  ngOnInit(): void {


    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = '');
  }

  confirmar(use: User) {

    let valor = confirm("¿Desea borrar el usuario X?");
    if (valor) {
      this.usuarioService.borrarUsuario(use.id)
        .subscribe((data: any) => {
          if (data.affectedRows >= 1) {
            this.usuarioService.obtenerUsuarios()
            .subscribe((data: User[]) => {
              this.usuarios = data;
              console.log("Todos los usuarios guardados")
            });
            console.log("Eliminado usuario");
          }
          else {
            console.log("No se ha eliminado usuario");
          }
        });
    }
  }

  open(content, user:User) {
     this.user= user;    
     this.nombre= this.user.nombre;
     this.apellido1= this.user.apellido1;
     this.apellido2= this.user.apellido2;
     this.dni= this.user.dni;
     this.fecha= this.user.fechaNacimiento;
     this.email =this.user.email;
     this.telefono =this.user.telefono;
     this.direccion= this.user.direccion;

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

  guardar() {
     this.user.nombre=this.nombre;
     this.user.apellido1=this.apellido1;
     this.user.apellido2=this.apellido2;
     this.user.dni=this.dni;
     this.user.fechaNacimiento=this.fecha;
     this.user.email=this.email;
     this.user.telefono=this.telefono;
     this.user.direccion=this.direccion;
   
    this.usuarioService.actualizarUsuario(this.user)
    .subscribe((data: any) => {
      if (data.affectedRows >= 1) {
        console.log("Usuario modificado");
        this.changeSuccessMessage("Modificado Datos");
      }
      else {
        console.log("No se ha modificado usuario");
        this.changeSuccessMessage("No se ha Modificado");
      }
    });

  }

  public changeSuccessMessage(mensaje: string) {
    this._success.next(`Datos ` + mensaje);
  }
}