const express= require("express") ;
const app = express() ;  
const cors  =require("cors") ; 
const conn = require("./config/conn"); 
const port = 8080 ;
conn() ; 
app.use(express.json({limit:"30mb"  , extended:true}) ) ; 
app.use(express.urlencoded({limit:"30mb"  , extended:true}) ) ; 

app.use(cors()) ; 
app.use("/posts" ,require("./routes/post") ) ; 
app.use("/users" , require("./routes/users")) ; 
app.listen(port , ()=>{
    console.log(`listening at port number ${port}`) ; 
})