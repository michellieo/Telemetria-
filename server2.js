var mysql = require('mysql');
var con = mysql.createConnection({
    host: 'momlamrds2.c8q4dbr4gr4v.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Marquezluis=27',
    database: 'momlamrds3'
});
// insertar 
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO customers (name, address) VALUES ('amelia ', 'calle23a')";
    con.query(sql, function(err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

// seleccionar 

con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM customers", function(err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});

//seleccionar cuando 
// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM customers WHERE address = 'calle23a'", function(err, result) {
//         if (err) throw err;
//         console.log(result);
//     });
// });

//ordenar por 
// con.connect(function(err) {
//     if (err) throw err;
//     con.query("SELECT * FROM customers ORDER BY name", function(err, result) {
//         if (err) throw err;
//         console.log(result);
//     });
// });

// eliminar 
// con.connect(function(err) {
//     if (err) throw err;
//     var sql = "DELETE FROM customers WHERE address = 'calle23a'";
//     con.query(sql, function(err, result) {
//         if (err) throw err;
//         console.log("Number of records deleted: " + result.affectedRows);
//     });
// });