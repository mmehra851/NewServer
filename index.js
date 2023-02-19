
const express = require("express")


const {connection}=  require("./config/db")
const {UserRoutes} = require("./Routes/userRoute")
const {notesRouter} = require("./Routes/notes")
const {validator} = require("./middleware/middleware")
const cors = require("cors")
const app = express()

app.use(express.json())

app.use(cors())
app.get("/",(req,res)=>{
    res.send("This is Home Page")
})

app.use("/users",UserRoutes)

app.use(validator)

app.use("/notes",notesRouter)

app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("connected to mongoose DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at PORT ${process.env.PORT}`)
})













