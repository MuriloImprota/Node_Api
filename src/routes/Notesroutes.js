

const { Router } = require("express") //import express


const NotesController = require("../controllers/NotesController") //import Usercontrollers class

const notesRoutes = Router(); // // instance Router Function


const notesController = new NotesController();



notesRoutes.post("/:user_id",notesController.create)  // use post method to create data information from UserControllers and Middleware function to acess data information
notesRoutes.get("/:id",notesController.show)
notesRoutes.delete("/:id",notesController.delete)
notesRoutes.get("/",notesController.list)


module.exports = notesRoutes; //export the module userRoutes
