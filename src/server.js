
require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations")
const express = require("express") //import express properties
const AppError = require("./utils/AppError")


const routes = require("./routes")
migrationsRun();

const app = express(); //inicialize express

app.use(express.json()); //instance express to accept json format

app.use(routes)




app.use((error, req, res, next) => {
    if (error instanceof AppError) { //check if it's a user error 
        return res.status(error.statusCode).json({
            status: "error",
            message: error.message
        })
    }
    console.log(error)

    return res.status(500).json({
        status: "error",
        message: "internal server error"
    })
})

const PORT = 4000; // instance server port



app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`)) // use listen property to observe the element PORT and execute a arrow function.


