var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'disegno.c1zubqmplqbj.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'qwertyuiop',
    database: 'momlamdb'
});

// Crear base de datos 
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     con.query("CREATE DATABASE momlamdb", function (err, result) {
//       if (err) throw err;
//       console.log("Database created");
//     });
//   });

//crear tabla
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "CREATE TABLE syrusmsg (igmsg int, mensaje VARCHAR(255))";
//     con.query(sql, function(err, result) {
//         if (err) throw err;
//         console.log("Table created");
//     });
// });

//Insertar elemento
// con.connect(function(err) {
//     if (err) throw err;
//     console.log("Connected!");
//     var sql = "INSERT INTO syrusmsg (mensaje) VALUES ('LUCHO ES BOBO')";
//     con.query(sql, function (err, result) {
//       if (err) throw err;
//       console.log("1 record inserted");
//     });
//   });
// Borrar elemneto de la base de datos
con.connect(function(err) {
    if (err) throw err;
    var sql = "DELETE FROM syrusmsg WHERE mensaje = 'LUCHO ES BOBO'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  });