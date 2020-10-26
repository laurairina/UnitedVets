export class User {
    password1: string;
  password2: string;
    constructor(public id:number, public nombre_usuario:string, public password:string, public rol:string,public nombre:string, public apellido1:string, public apellido2:string, public fechaNacimiento:string, public dni:string, public email:string, public telefono:string, public direccion:string,public nColegiado:string, public especialidad:string, public foto:Blob){
        //(id, `nombre`, `apellido1`, `apellido2`, `password`, `rol`, `fechaNacimiento`, `dni`, `foto`, `email`, `telefono`, `direccion`, `nColegiado`, `especialidad`, `nombre_usuario`)
    }
}
