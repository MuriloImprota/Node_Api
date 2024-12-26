
const AppError = require("../utils/AppError")
const { hash, compare } = require('bcryptjs'); //import crypto library.

const sqliteconnection = require("../database/sqlite")
class Usercontrollers {

  async create(req, res) {

    const { name, email, password } = req.body; // on application's body, catch this fields

    const database = await sqliteconnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if (checkUserExists) {
      throw new AppError("This email is already taken")
    }

    const hashedpassword = await hash(password, 8) //variable receive an encryption with complexity level 8

    await database.run("INSERT INTO users (name , email , password) VALUES (? , ? , ?)",
      [name, email, hashedpassword]
    )

    return res.status(201).json();


  }


  async update(req, res) { // async function to update data
    const { name, email, password, oldpassword } = req.body; //request name and email from request body
    const { id } = req.params;

    const database = await sqliteconnection(); //start sqlite connection
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]) //get from database user id

    if (!user) { // if user id doesn't exists 
      throw new AppError("user not found ");

    }

    const userwithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //if user id exist, get user email

    if (userwithUpdatedEmail && userwithUpdatedEmail.id !== user.id) { //is user email and id are found, and are different from user id, so the email is already in use
      throw new AppError("This email is already taken");
    }

    user.name = name ?? user.name; // if there's no name alteration, the previous shall be preserved
    user.email = email ?? user.email; // if there's no email alteration, the previous shall be preserved

    if (password && !oldpassword) {
      throw new AppError("Inform your old password to define a new one")
    }

    if (password && !oldpassword) {
      const checkoldPassword = await compare(oldpassword, password)

      if (!checkoldPassword) {
        throw new AppError("Password doesn't match")
      }

      user.password = await hash(password, 8)
    }

    await database.run(
      `UPDATE users SET 
       name = ?,
       email = ?,
       password = ?,
       updated_at = DATETIME('now') 
       WHERE id = ?`,
      [user.name, user.email, user.password, id])


    return res.status(200).json()


  }
}

module.exports = Usercontrollers;