

const { Router } = require("express") //import express

const Usercontrollers = require("../controllers/Usercontrollers") //import Usercontrollers class

const usercontrollers = new Usercontrollers()

const userRoutes = Router(); // // instance Router Function


userRoutes.post("/", usercontrollers.create)  // use post method to create data information from UserControllers and Middleware function to acess data information
userRoutes.put("/:id", usercontrollers.update)

module.exports = userRoutes; //export the module userRoutes
