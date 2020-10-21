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


//-----------------------------------------GET-----------------------------------------------
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




//Seguir usuario --> GET http://localhost:3000/usuario/datos?nombre=Dani&passw=123456
/*app.get('/usuario/datos',
(req, res) => {
    let nombre = req.query.nombre;
    let passw=req.query.passw;
    params= new Array(nombre,passw);
        //todos los usuarios
        sql="SELECT * FROM `usuario` where nombre_usuario=? AND password=?";
        ejecutar(sql,params,res);
        console.log("sin id")
    
});
*/


//----------------------------------------POST-----------------------------------------
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

app.post('/usuario', function (req, res) {
    let data = req.body;
    params = new Array(data.titulo, data.interprete, data.anyoPublicacion);
    sql= "INSERT INTO discos(titulo, interprete, anyoPublicacion) VALUES (?,?,?)";

    ejecutar(sql,params,res);


    console.log('Nuevo disco');
});  
//---------------------------------------------PUT--------------------------------------------

app.put('/usuario', function(req,res) {
    let data = req.body;
    params=new Array(data.titulo, data.interprete, data.anyoPublicacion,data.id)
   sql= "UPDATE discos SET titulo=?, interprete=?, anyoPublicacion=? WHERE id=?";
    
   ejecutar(sql,params,res);

});

//---------------------------------------DELETE---------------------------------------------

app.delete('/usuario', function (req, res) {
    let data = req.query.id;//req.body;
     
    sql ="DELETE FROM discos WHERE id="+data;
    ejecutar(sql,params,res);

});






//-------------------------------Endpoint Dani Mascotas-----------------------------------

//------------------------------ GET MASCOTA--------------------------------
app.get('/mascota',
(req, res) => {
    let usuario_id = req.query.usuario_id;
        params = usuario_id;
        sql="SELECT * FROM `mascota` WHERE usuario_id = ?";    
        ejecutar(sql,params,res);
        console.log("con id")
 
});

//---------------------------GET CLIENTES Dani-----------------------------------------

app.get('/cliente',
(req, res) => {
    let nombre = req.query.nombre;
    
        params= nombre;
        sql="SELECT * FROM `usuario`where usuario.rol='Cliente'";    
        ejecutar(sql,params,res);
        console.log("con id")
    
 
});
//-------------------------------- POST MASCOTA-------------------------------

app.post('/mascota', function (req, res) {
    let data = req.body;
    params = new Array(data.nombreM, data.chip, data.especie, data.raza, data.usuario_id, data.fechaNacimiento, data.alergias);
    sql= "INSERT INTO `mascota` (`nombreM`, `chip`, `especie`, `raza`, `usuario_id`, `fechaNacimiento`, `alergias`) VALUES ( ?, ?, ?, ?, ?, ?, ?)";

    console.log(data);
    console.log("holi");
    ejecutar(sql,params,res);


    console.log('Mascota añadida');
});  

//----------------------------------- PUT MASCOTA ---------------------------------------------------

app.put('/mascota', function(req,res) {
    let data = req.body;
    params = new Array( data.nombreM, data.chip, data.especie, data.raza, data.fechaNacimiento, data.alergias,data.id);
   sql= "UPDATE `mascota` SET `nombreM`=?, `chip`=?, `especie`=?, `raza`=?, `fechaNacimiento`=?, `alergias`=? WHERE `id`=?";
    console.log(params)
   ejecutar(sql,params,res);

});

//-------------------------Final de endpoint Mascota-----------------------------------
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
