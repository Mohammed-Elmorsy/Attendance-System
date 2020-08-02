let mongoose=require("mongoose");

//schema 
let roleSchema=new mongoose.Schema({
    _id:Number,
    role:String
});

//mapping
mongoose.model("role",roleSchema);