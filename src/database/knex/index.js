const config = require("../../../knexfile") //import config location file
const knex = require("knex"); //import knex to file

const connection = knex(config.development) // import knex connection
module.exports = connection;