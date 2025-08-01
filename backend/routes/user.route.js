const express = require("express")


const router = express.Router()

router.get("/register",(req,res)=>{
    res.render("index")

})

router.get("/",(req,res)=>{
    res.send("Default page")
})


module.exports = router