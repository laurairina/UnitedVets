const bodyParser = require("body-parser");
const express = require("express");
const { get, request } = require("http");
const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
let mysql = require ("mysql")
let cors = require('cors')
app.use(cors())
let connection = mysql.createConnection(
    {
        host: "127.0.0.1",
        user: "root",
        password: null,
        database: "united_vets" 

    }

  )

  connection.connect(function(error){
    if(error){  console.log(error)  }
    else{ console.log("conexion correcta");  }
  })

  let params; 
  let sql; 

function ejecutar(sql, params, res){
    connection.query(sql,params, function(err,response){
        if(err){
            console.log("Error"+err);
            res.send(err);
        }
        else{
          console.log("Resultado correcto"); 
          
            if(sql.includes('SELECT')){
                 if(response.length >0){
                    res.send(response);  
                 }
                 else{
                    res.send({ error: true, codigo: 200, mensaje: 'No tiene resultado ' });
                 }
            }
            else{
                res.send(response);  
            }
           
            console.log()
          

        }
    });
}


//----------------------------------------- Usuario L -----------------------------------------------
//GET   "http://localhost:3000/usuario?nombre=Tania"  ó "http://localhost:3000/usuario"
app.get('/usuario',
(req, res) => {
    let nombre = req.query.nombre;
    if (nombre) {
        params= nombre;
        sql="SELECT * FROM `usuario`where nombre_usuario=?";    
        ejecutar(sql,params,res);
        console.log("con id")
    }
    else {
        //todos los usuarios
        sql="SELECT * FROM `usuario`";
        ejecutar(sql,params,res);
        console.log("sin id")
    }
});

//para loguearse
app.post('/usuario/datos', function (req, res) {
    let nombre =req.body.nombre;
    let passw=req.body.passw;
    params= new Array(nombre,passw);
        //todos los usuarios
        sql="SELECT * FROM `usuario` where nombre_usuario=? AND password=?";
        ejecutar(sql,params,res);
        console.log("sin id"+nombre+passw)

    console.log('Nuevo entrada');
});

app.post('/usuario/dni', function (req, res) {
    let dni =req.body.dni;

    params= dni;
        //todos los usuarios
        sql="SELECT * FROM `usuario` where dni=?";
        ejecutar(sql,params,res);
        console.log("DNI "+dni)

});



app.post('/usuario/mascota', function (req, res) {
    let id =req.body.id;

    params= id;
        //todos los usuarios
        sql="SELECT u.* FROM mascota as m JOIN usuario as u ON(m.usuario_id=u.id) where m.id=?";
        ejecutar(sql,params,res);
        console.log("Id de mascota "+id);

});

//INSERT INTO `usuario` (`id`, `nombre`, `apellido1`, `apellido2`, `password`, `rol`, `fechaNacimiento`, `dni`, `foto`, `email`, `telefono`, `direccion`, `nColegiado`, `especialidad`, `nombre_usuario`) VALUES (NULL, 'Maria', 'Mendoza', 'Morales', '123', 'Cliente', '1991-04-12', '12312123', NULL, 'maria@gmail.com', '66662222', 'C/ Topacio 50,28360, Galapagar, Madrid', '', '', 'Maria')
app.post('/usuario', function (req, res) {
    let data = req.body;
    params = new Array( data.nombre, data.apellido1, data.apellido2, data.password, data.rol, data.fechaNacimiento, data.dni, data.foto, data.email, data.telefono, data.direccion, data.nColegiado, data.especialidad, data.nombre_usuario);
    sql= "INSERT INTO `usuario` ( `nombre`, `apellido1`, `apellido2`, `password`, `rol`, `fechaNacimiento`, `dni`, `foto`, `email`, `telefono`, `direccion`, `nColegiado`, `especialidad`, `nombre_usuario`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

    ejecutar(sql,params,res);

    console.log('Nuevo Usuario');
});  


app.put('/usuario', function(req,res) {
    let data = req.body;

    params=new Array(data.nombre, data.apellido1, data.apellido2, data.password, data.rol, data.fechaNacimiento, data.dni, data.foto, data.email, data.telefono, data.direccion, data.nColegiado, data.especialidad, data.nombre_usuario, data.id);
   sql= "UPDATE usuario SET nombre=?, apellido1=?, apellido2=?, password=?, rol=?, fechaNacimiento=?, dni=?, foto=?, email=?, telefono=?, direccion=?, nColegiado=?, especialidad=?, nombre_usuario=? WHERE id=?";
    
   ejecutar(sql,params,res);

});

app.delete('/usuario', function (req, res) {
    let data = req.query.id;
     
    sql ="DELETE FROM usuario WHERE id="+data;
    ejecutar(sql,params,res);

});

//----------------------- Fin Usuario -----------------------------------







//---------- Metodo sin pagina y escuchar servidor   
/*si no pasan correctamente un 
url entraria en este metodo llamado use, usaria next
si queremos que aparesca en el middleware */
app.use(
    (req, res, next) => {
        let respuesta = { error: true, codigo: 404, mensaje: 'Url no encontrada' };
        res.status(404).send(respuesta);
        //next();
    }
);

app.listen(3000, function () {
    console.log('Server is running..');
});
