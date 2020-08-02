let express=require("express");
let path = require("path");
let mongoose=require("mongoose");
require("../Models/employeeDataModel");
let employeeSchema=mongoose.model("employees");
let adminRouter=express.Router();
let verifyToken = require('../verifyToken');

adminRouter.get("/empList",verifyToken,(request,response)=>{ 
    employeeSchema.find({confirm:true})
                 .then((data)=>{
                    response.send(data);
                 })
                 .catch((error)=>{
                     response.send("list employees "+error)
                 })

})//end of get 


//request
adminRouter.get("/requests",verifyToken,(request,response)=>{
    employeeSchema.find({confirm:false})
                 .then((data)=>{
                    response.send(data);
                 })
                 .catch((error)=>{
                     response.send("request employees "+error)
                 })
})//end of get 

adminRouter.post("/EditEmployee",verifyToken,(request,response)=>{
    employeeSchema.updateOne({_id:request.body._id},{
         $set:{
            confirm:true,
            userName:request.body.userName,
            password:request.body.password
             
         }
     }).then((data)=>{response.send(data);})
     .catch((error)=>{response.send("update employee error"+error)});
 });//end of put update
 
 adminRouter.post("/deleteEmployee",verifyToken,(request,response)=>{
    employeeSchema.deleteOne({_id:request.body.id})
    .then(()=>{response.send("deleted")})
    .catch((error)=>{response.send("delete employee error"+error)});
 });//end pf delete

module.exports=adminRouter;
