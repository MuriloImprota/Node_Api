const sqliteconnection = require("../../sqlite") //import database connection

const createUsers = require("./createUsers") //import createUsers

async function migrationsRun(){ //create a function to run migrations
    const schemas = [createUsers].join(''); //create a variable schemas to receive database users, add in an array and remove the spaces between.
    sqliteconnection().then(db => //start sqlite connection and then execute schemas
        db.exec(schemas))
        .catch(error => console.log(error)); // if there's errors, catch them e show at the console log
}

module.exports = migrationsRun