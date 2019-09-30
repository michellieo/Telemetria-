//data base
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "momlam.cbmnujsscquv.us-east-2.rds.amazonaws.com",
  user: "admin",
  password: "qwertyuiop",
  database: "momlam"
});
//sniffer
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
var mensaje;
server.on("error", err => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});
server.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  mensaje = msg.toString("utf8");

  // Deco
  let long, lat, fech;
  long = mensaje.slice(27, 31) + mensaje.slice(31, 36);
  long = parseFloat(long);
  lat = mensaje.slice(19, 22) + mensaje.slice(22, 27);
  lat = parseFloat(lat);
  if (long > 0) {
    long = -1 * long;
  } else {
    long = long;
  }
  //console.log(lat);

  fech = mensaje.slice(6, 19);
  //d = datos[10];
  // tiem = datos.slice(11, 16);
  fech = new Date(parseFloat(fech) - 18000000); //
  // console.log(fech);
  let Fecha = `${fech.getFullYear()}-${fech.getMonth() + 1}-${fech.getDate()}`;
  let Hora = `${fech.getHours()}:${fech.getMinutes()}:${fech.getSeconds()}`;
  if (con) {
    console.log("Connected!");
    var sql =
      "INSERT INTO Segunda (Fecha , Hora , Latitud , Longitud ) VALUES ?";
    var value = [[Fecha, Hora, lat, long]];
    con.query(sql, [value], function(err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  } else {
    console.log("Error conection with db");
  }

  // insertar aqui db
});
server.on("listening", () => {
  const address = server.address();
  //console.log(`server listening ${address.address}:${address.port}`);
});
server.bind(41550, "172.31.24.32"); //172.31.86.140
// Prints: server listening 0.0.0.0:41234

//base de datos

// server
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var hbs = require("express-hbs");
const path = require("path");
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //Arregla la petición , la hace bonita
app.engine(
  "hbs",
  hbs.express4({
    partialsDir: __dirname + "/views"
  })
);
app.set("view engine", ".hbs");
app.set("views", __dirname + "/views");

// static files
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home", {
    nombre: "MOMLAM"
  });
});

app.get("/coord", (req, res) => {
  if (con) {
    var sql = "SELECT * FROM Segunda ORDER BY id DESC limit 1 ";
    con.query(sql, function(err, result) {
      if (err) throw err;
      res.json(result[0]);
    });
  } else {
    console.log("error conection with db");
  }
  //res.json(`${mensaje}`);
});
// app.get('/plana', (req, res) => {
//     res.render('coor', {});
// });
app.post("/history", (req, res) => {
  console.log(req.body); // no existe sin body parser , req.body es la data recibida
  if (con) {
    console.log("Connected!");
    var sql =
      "SELECT * FROM Segunda where Fecha between ? and ? and Hora between ? and ? ";
    var value = [
      req.body.fecha1,
      req.body.fecha2,
      req.body.hora1,
      req.body.hora2
    ];
    con.query(sql, value, function(err, result) {
      if (err) throw err;
      res.json(result);
    });
  } else {
    console.log("Error conection with db");
  }
});
app.get("/mapa", (req, res) => {
  res.render("mapa2", {});
});
app.get("/historicos", (req, res) => {
  res.render("historicos", {});
});

app.listen(port, () => {
  console.log(`Escuchando peticiones en el puerto ${port}`);
});
