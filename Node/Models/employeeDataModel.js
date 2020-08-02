let mongoose=require("mongoose");
/* autoIncrement = require('mongoose-auto-increment');
let connection = mongoose.createConnection("mongodb://localhost:27017/attendenceSystem", { useNewUrlParser: true, useUnifiedTopology: true });
autoIncrement.initialize(connection); // mongoose to connect db */

//schema 
let employeeSchema=new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId},
    firstName:String,
    lastName:String,
    age:Number,
    address:String,
    email:String,
    userName:String,
    password:String,
    confirm:false,
    role:String,
    refreshToken:String,
    day:String,
    presenceDay:String
/*     roleID:{
        type:Number,
        ref:"role"
    } */
    /*
    _id:{
        type: Number ,
        required: true
        } ,
    name: {
        type: String ,
        required: true,
        min: 3,
        max: 255
    },

    email: {
        type: String,
        required: true,
        unique:true,
        min: 8,
        max: 255
    },

    password: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    },
    type: {
        type: String,
        required: true,
        min: 6,
        max: 50
    },
    date: {
        type: Date,
        default: Date.now
    }
})
userSchema.plugin(autoIncrement.plugin, { model: 'User', field: '_id', startAt: 1, incrementBy: 1 })
module.exports = mongoose.model("User",userSchema) 
    */
});

//mapping
/* employeeSchema.plugin(autoIncrement.plugin, { model: 'employee', field: '_id', startAt: 1, incrementBy: 1 })
 */
mongoose.model("employees",employeeSchema);