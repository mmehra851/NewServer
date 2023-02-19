const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    email: {type:String,required:true},
    password: {type:String,required:true},
    name: {type:String,required:true},
    ContactNo: {type:Number,required:true}
})

const userModel = mongoose.model("user",userSchema)

module.exports={
    userModel
}