let mongoose=require("mongoose");

//schema 
let attendenceSchema=new mongoose.Schema({
  
    empID:{ 
        type: mongoose.Schema.Types.ObjectId,
        ref:"employees"
    },
    day:String,
    attendenceTime:String,
    month:Number,
    LeavingTime:String,
    late:Boolean
    
});

//mapping
mongoose.model("attendences",attendenceSchema);