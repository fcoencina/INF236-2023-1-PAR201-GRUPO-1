
//CRUD triages
const express = require("express");
const triageSchema = require("../models/triage");

//Aquí se crea un enrutador de triage
const router = express.Router();

//Create triage
router.post("/triage/add", (req, res) => {
    //Creamos un triage
    const triage = triageSchema({
        paciente: {
            id: req.body.paciente.id,
            name: req.body.paciente.name,
            rut: req.body.paciente.rut
        },
        remitido_por: req.body.remitido_por,
        centro_remitente: req.body.centro_remitente,
        motivo_consulta: req.body.motivo_consulta,
        signos_vitales: req.body.signos_vitales,
        fecha_hora: req.body.fecha_hora,
        categorizaciones: req.body.categorizaciones,
        createdAt: new Date()
    });

    triage
    .save()
    .then((data) => res.json(data))
    .catch((Error) => res.json({message: Error}));
});

//get all users
router.get("/triage", (req, res) => {
    triageSchema
    .find()
    .sort({ createdAt: -1 }) // Ordenar por campo createdAt en orden descendente (-1)
    .then((data) => res.json(data))
    .catch((Error) => res.json({message: Error}));
});

//get a user
router.get("/triage/:pacient_id", (req, res) => {
    const {pacient_id} = req.params;
    triageSchema
    .findOne({"paciente.id":pacient_id})
    .then((data) => res.json(data))
    .catch((Error) => res.json({message: Error}));
});

//update user
router.put("/utriage/:pacient_id", (req, res) => {
    const {pacient_id} = req.params;
    const {remitido_por, centro_remitente, 
    motivo_consulta, signos_vitales, fecha_hora, categorizaciones } = req.body;
    triageSchema
    .updateOne({ "paciente.id": pacient_id }, {$set: {
            remitido_por,
            centro_remitente,
            motivo_consulta,
            signos_vitales,
            fecha_hora,
            categorizaciones
          }
        }
    )
    .then((data) => res.json(data))
    .catch((Error) => res.json({message: Error}));
});

//delete user
router.delete("/deletetriage/:id", (req, res) => {
    const {id} = req.params;
    triageSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((Error) => res.json({message: Error}));
});

module.exports = router;