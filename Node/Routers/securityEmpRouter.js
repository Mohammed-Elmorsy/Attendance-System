let express=require("express");
let path = require("path");
let mongoose=require("mongoose");
require("../Models/employeeDataModel"); 
require("../Models/attendenceModel");
let employeeSchema=mongoose.model("employees");
let attendenceSchema=mongoose.model("attendences");
let securityEmpRouter=express.Router();
let verifyToken = require('../verifyToken');

const getCurrentDay = function getDay() {return new Date().toDateString()};

//emp list
securityEmpRouter.get("/empList",verifyToken, async (request,response)=>{ 
    try {
        const updateCurrentDay = await employeeSchema.updateMany({day: getCurrentDay()});

        if(updateCurrentDay){
             const employees = await employeeSchema.find({day: getCurrentDay(), confirm:true ,presenceDay:{$ne: getCurrentDay()} });
             return response.send(employees)
        }
          
    } 
    catch (error) {
        response.send('error in DB');
    }
    
})//end of get  


//leave time
securityEmpRouter.put("/recordEmployee",verifyToken,(request,response)=>{
    attendenceSchema.updateOne({_id:request.body.id},{
        $set:{
            LeavingTime:request.body.LeavingTime
        }
    }).then((data)=>{response.send(data)})
    .catch((error)=>{response.send("add employee error"+error)});
});//end of post add 




module.exports=securityEmpRouter;
