const express = require("express")
const cors = require("cors")
const userRoutes = require('./routes/user.route')
require('dotenv').config();
const app = express()
app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

const { connectToDB } = require("./config/db")


app.use(cors({
  origin: 'http://localhost:3000', // Change to your frontend address if on another device/network
  credentials: true,
}));


app.use('/', userRoutes);



connectToDB().then(()=>{
  app.listen(3000, ()=>{
  console.log("Server started and connected to DB")
})
})
