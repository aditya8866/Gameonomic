const mongoose = require('mongoose')



const connectToDB = async ()=>{
    const conn = mongoose.connect(process.env.MONGODB_URI);
    console.log("Connect to MongoDB")
}





const historySchema = new mongoose.Schema({
    gameName:{
        type:String,
        required:true,
    },
    currPrice:{
        type:Number,
        required:true
    }
})

const favGamesSchema = new mongoose.Schema({
    gameName:{
        type:String,
        required:true,
    },
    currPrice:{
        type:Number,
        required:true
    }
})

const userSchema = new mongoose.Schema({
    fullName: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Minimum 3 character are required"]
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, "Minimum 3 character are required"]
        }
    },

    email:{
        type:String,

        required:true,

        minlength:[13,"Enter a valid mail id"]
    },

    password:{
        type:String,
        required:true,
        minlength:[6,"Minimum 6 character required"],
        select:false
    },

    history:{
        type:[historySchema]
    },

    favGames:{
        type:[favGamesSchema]
    }


    
})  



module.exports = {
  connectToDB,
  userSchema
};