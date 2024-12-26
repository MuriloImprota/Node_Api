//this file shall regroup all routes from the application to index 


const { Router } = require("express") //import express 

const userRoutes = require("./UserRoutes") //import the UserRoutes file
const notesRoutes = require("./Notesroutes")
const tagsroutes = require("./tagsroutes")
const routes = Router(); // instance Router Function

routes.use("/users", userRoutes) //redirect the adress users to userRoutes
routes.use("/notes", notesRoutes) //redirect the adress notes to NotesRoutes
routes.use("/tags", tagsroutes) //redirect the adress tags to tagsroutes
module.exports = routes;