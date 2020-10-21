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

  open(content) {
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
    this.changeSuccessMessage("Guardados");

  }

  public changeSuccessMessage(mensaje: string) {
    this._success.next(`Datos ` + mensaje);
  }
}