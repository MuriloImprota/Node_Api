const sqlite = require("sqlite"); //sqlite database
const sqlite3 = require("sqlite3"); //sqlite driver
const path = require("path") //node library to acess different directories

async function sqliteconnection() {
    const database = await sqlite.open({
        filename: path.resolve(__dirname, "..", "database.db"), //order path to resolve directory location
        driver: sqlite3.Database
    });

    return database;
}

module.exports = sqliteconnection;