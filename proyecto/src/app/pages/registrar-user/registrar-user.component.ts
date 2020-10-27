import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UsuariosService } from 'src/app/shared/usuarios.service';
import { User } from 'src/app/model/user';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar-user',
  templateUrl: './registrar-user.component.html',
  styleUrls: ['./registrar-user.component.css']
})
export class RegistrarUserComponent implements OnInit {

  passControl = new FormControl('');
  public opciones:string[] = [
    'Cliente',
    'Veterinario'
  ];

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
  public nColegiado: string;
  public especialidad: string;

  private _success = new Subject<string>();
  public successMessage:string;
  staticAlertClosed = false;
  public mensajeError=false;

  constructor(public usuarioService:UsuariosService, private router: Router) {
    this.successMessage = '';
   }

  ngOnInit(): void {
      //Mensaje de alerta
      setTimeout(() => this.staticAlertClosed = true, 20000);

      this._success.subscribe(message => this.successMessage = message);
      this._success.pipe(
        debounceTime(5000)
      ).subscribe(() => this.successMessage = '');
  }

  public changeSuccessMessage(mensaje:string) {
    this._success.next(`Datos `+mensaje);
  }

  public registrar(){
     if(this.password1== this.password2){
      let user:User= new User(0, this.usuario, this.password1, this.tipoDeUsuario,this.nombre, this.apellido1, this.apellido2, this.fecha, this.dni, this.email, this.telefono, this.direccion, this.nColegiado, this.especialidad, null);
      this.usuarioService.insertarUsuario(user)
      .subscribe((data:any)=>{
        if(data.affectedRows>=1){
          this.mensajeError=false;
          this.changeSuccessMessage("Añadido nuevo usuario");
          this.router.navigateByUrl('/registrarPet');
        }
        else{
          this.mensajeError=true;
          this.changeSuccessMessage("No se añadido usuario"); 
        }
        
      })
     }
     else{
      this.changeSuccessMessage("de Contraseñas no son iguales"); 
     }
    
  

    console.log(this.nombre+this.apellido1+ this.apellido2+ this.fecha+this.email+this.telefono+this.direccion+this.dni +this.tipoDeUsuario+this.usuario+this.password1+this.password2)
  }

  

}
