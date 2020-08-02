let express=require("express");
let path = require("path");
let mongoose=require("mongoose");
let authRouter=express.Router();
require("../Models/employeeDataModel");
let employeeSchema=mongoose.model("employees");
require("../Models/attendenceModel.js");
let attendenceSchema=mongoose.model("attendences");7
const jwt = require("jsonwebtoken");
require('dotenv').config();
require('crypto')

function getDay() {return new Date().toDateString()};
function getAttendTime() { return new Date().toTimeString()};

//register
authRouter.post("/register",(request,response)=>{
    console.log(request.body);
    let employeeObject = new employeeSchema({
       _id: mongoose.Types.ObjectId(),
       firstName:request.body.firstName,
       lastName:request.body.lastName,
       age:request.body.age,
       address:request.body.address,
       email:request.body.email,
       role:request.body.role,
       confirm:false  
    });

    employeeObject.save()
    .then(data => {
      console.log('from second then  '+data);
      response.send(data);
    })
    .catch((error)=>{
      console.log('from catch  '+error)
      response.send("add employee error"+error)});
});//end of post add 

//login
authRouter.post("/login",async (request,response)=>{
    // checking if the userName exists in the DB
    const employee = await employeeSchema.findOne({ userName: request.body.userName, password:request.body.password });

    console.log(employee);

    if (employee == null) {
        return response.send({message:'invalid user'})
    }

    //generate access token and refresh token
    const payload = {id:employee._id, role:employee.role,firstName:employee.firstName};
    const accessToken = generateAccessToken(payload);
    const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET)

    //update refresh token in DB
    refreshTokenToDB = await employeeSchema.updateOne({_id:employee._id},{$set:{refreshToken:refreshToken}})

    console.log(refreshTokenToDB)
    if(!refreshTokenToDB) return response.status(500).send('db error')

    return response.status(200).send({ accessToken , refreshToken});

});//end of post add 

authRouter.post('/token', async(request, response) => {
    const refreshToken = request.body.refreshToken
    console.log(refreshToken)
    if (refreshToken == null) return response.send('refresh token is null')

    refreshTokenInDB = await employeeSchema.findOne({refreshToken:refreshToken});
    if(!refreshTokenInDB) return response.send('not in db')

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async(err, payload) => {
      if (err) return response.send('verification error')

      const newAccessToken = generateAccessToken({role:payload.role,firstName:payload.firstName})
      const randomNumber = Math.random();
      const newRefreshToken = generateRefreshToken({num:randomNumber ,role:payload.role,firstName:payload.firstName})
      
      //update refresh token in DB
      const refreshTokenToDB = await employeeSchema.update({refreshToken:refreshToken},{$set:{refreshToken:newRefreshToken}})

      if(!refreshTokenToDB) return response.status(400).send('db error')

      return response.send({ newAccessToken,newRefreshToken})
    })
  })

authRouter.delete('/logout',async (request,response) => {
    const refreshToken = request.body.refreshToken
    await employeeSchema.deleteOne({refreshToken:refreshToken})
    response.sendStatus(204) 
  })

function generateAccessToken(payload){
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET , { expiresIn: "20m"})
}
function generateRefreshToken(payload){
  return jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET)
}

module.exports = authRouter;