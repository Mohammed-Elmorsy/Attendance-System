let express=require("express");
let path = require("path");
let mongoose=require("mongoose");
require("../Models/employeeDataModel");
let employeeSchema=mongoose.model("employees");
let employeeRouter=express.Router();
let verifyToken = require('../verifyToken');

//MW

/* employeeRouter.get("/profile",verifyToken,(request,response)=>{
    employeeSchema.findOne({_id:request.body.id})
                 .then((data)=>{
                    response.send(data);
                 })
                 .catch((error)=>{
                     response.send("list employees "+error)
                 })
})//end of get  */
module.exports=employeeRouter;