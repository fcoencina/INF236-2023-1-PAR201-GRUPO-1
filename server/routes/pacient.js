
//CRUD pacients
const express = require("express");
const pacientSchema = require("../models/pacient");
const triageSchema = require("../models/triage");
const anamnesisSchema = require("../models/anamnesis");

//Aquí se crea un enrutador de pacient
const router = express.Router();

//Create pacient
router.post("/pacient/add", (req, res) => {
    //Creamos un user
    const pacient = pacientSchema({
        name: req.body.name,
        rut: req.body.rut,
        f_nacimiento: req.body.f_nacimiento,
        sexo: req.body.sexo,
        direccion: req.body.direccion,
        comuna: req.body.comuna,
        movil: req.body.movil,
        prevision: req.body.prevision,
        createdAt: new Date()
    });

    pacient
    .save()
    .then((data) => res.json(data))
    .catch((Error) => res.json({message: Error}));
});

//get all users
router.get("/pacient", (req, res) => {
    pacientSchema
    .find()
    .sort({ createdAt: -1 }) // Ordenar por campo createdAt en orden descendente (-1)
    .then((data) => res.json(data))
    .catch((Error) => res.json({message: Error}));
});

//get search
router.get("/search/:name", (req, res) => {
    /* Expresión regular que coincide con los nombres que comienzan con "a" o "A" 
    (ignorando mayúsculas/minúsculas).
    la opción "i" indica que la búsqueda debe ser insensible a mayúsculas y minúsculas.
    */
    const regex = new RegExp(req.params.name, "i"); 
    pacientSchema
    .find({name: regex})
    .then((data) => res.json(data))
    .catch((Error) => res.json({message: Error}));
});

//get a user
router.get("/pacient/:id", (req, res) => {
    const {id} = req.params;
    pacientSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((Error) => res.json({message: Error}));
});

//update user
router.put("/upacient/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { name, rut, f_nacimiento, sexo, direccion, comuna, movil, prevision } = req.body;
  
      await pacientSchema.updateOne({ _id: id }, { name, rut, f_nacimiento, sexo, direccion, comuna, movil, prevision });
      await triageSchema.updateMany({ "paciente.id": id }, { "paciente.name": name, "paciente.rut": rut });
      await anamnesisSchema.updateMany({ "paciente.id": id }, { "paciente.name": name, "paciente.rut": rut });
  
      res.status(200).json({ message: "Paciente actualizado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el paciente" });
    }
});
  

//delete user
router.delete("/delete/:id", (req, res) => {
    const {id} = req.params;
    pacientSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data))
    .catch((Error) => res.json({message: Error}));
})

module.exports = router;