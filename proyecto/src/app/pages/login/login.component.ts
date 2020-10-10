import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/shared/usuarios.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public usuario:string;
  public password:string;

  constructor(public usuarioService:UsuariosService,private router: Router) {

   }

  ngOnInit(): void {
  }

  public enviar():void{

    let user:User= this.usuarioService.buscar(this.usuario); 

    console.log(user)
    switch(user.rol){
    
       case"Admin":
       this.router.navigateByUrl('/homeAdmin');
       console.log("entra")
       break;

       case"Cliente":
       this.router.navigateByUrl('/homeCliente');
        break;

       case"Medico":
       this.router.navigateByUrl('/homeMedico');
       break; 
    }
    

     
  }

}
