const express = require("express");
const mongodb = require("mongodb");

let app = express();
app.listen(3004);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let db;
let MongoClient = mongodb.MongoClient;
MongoClient.connect('mongodb://127.0.0.1:27017/', function(err, client) {
    if (err !== undefined) {
        console.log(err);
    } else {
        db = client.db('naves2');
    }
});

app.get("/", function(request, response) {
    db.collection('naves2').find().toArray(function(err, datos) {
        if (err != undefined) {
            console.log(err);
            response.send({ mensaje: "error: " + err });
        } else {
            console.log(datos);
            response.send(datos);
        }
    })
})

app.get("/:nombreParametro", function(req, res) {
    let valorABuscar = req.params.nombreParametro;
    db.collection("naves2").find({ planeta: valorABuscar }).toArray(function(err, datos) {
        if (err != undefined) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {
            console.log(datos);
            res.send(datos);
        }
    });
});


app.get("/insert/:nombreParametro", function(req, res) {
    let valorAInsertar = req.params.nombreParametro;

    db.collection('naves2').insertOne({ planeta: valorAInsertar }, function(err, respuesta) {
        if (err !== undefined) {
            console.log(err),
                res.send({ mensaje: 'Ha habido un error. ' + err });
        } else {
            console.log(respuesta)
            console.log("Introducido correctamente")
        }
    });
    db.collection("naves2").find().toArray(function(err, datos) {
        if (err != undefined) {
            console.log(err);
            res.send({ mensaje: "error: " + err });
        } else {
            console.log(datos);
            res.send(datos);
        }
    });
});