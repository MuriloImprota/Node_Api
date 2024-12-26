

const { Router } = require("express") //import express

const TagsController = require("../controllers/Tagscontroller") //import Usercontrollers class

const tagsController = new TagsController()

const tagsroutes = Router(); // // instance Router Function



tagsroutes.get("/:user_id", tagsController.list)

module.exports = tagsroutes; //export the module userRoutes
