const express = require("express")
const jwt = require("jsonwebtoken")
const UserRoutes = express.Router()
const { userModel } = require("../Model/model")
const bcrypt = require("bcrypt")


UserRoutes.post("/register", async (req, res) => {
  const { email, password, name, ContactNo } = req.body
  try {
    bcrypt.hash(password, 5, async (error, hash) => {
      if (error) {
        res.send(error.message)
      } else {
        const user = new userModel({ name, email, password: hash, ContactNo })
        await user.save()
        res.send("New User Registered")
      }
    })

  } catch (error) {
    res.send({ error: error.message })
  }
})



UserRoutes.post("/login", async (req, res) => {
  const { email, password } = (req.body)
  try {
    const user = await userModel.find({ email })
    console.log(user)
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (error, result) => {
        if (result) {
          let token = jwt.sign({ user:user[0]._id}, "Backend")
          // console.log(token)
          res.send({ "msg": "logged In", "token": token})
        } else{
          res.send("Wrong Credentials")
        }
      })
    }
  } catch (error) {
    res.send(error)
  }
})


module.exports = {
  UserRoutes
}