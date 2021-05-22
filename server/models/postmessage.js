const mongoose  = require("mongoose"); 
const postschema  = mongoose.Schema({
    title:String,
    message:String,
    name: String,
    creator:String, 
    tags:[String] ,
    selectedFile: String , 
    likes:{
        type:[String] , 
        default:[] , 
    }  ,
    createdAt : {
        type : Date, 
        default : new Date()
    } , 
   

})
const postmessage = mongoose.model("Postmessage" , postschema) ; 
module.exports = postmessage ; 