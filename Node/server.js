let express=require("express");
let path=require("path");
let mongoose=require("mongoose");
let employeeRouter=require("./Routers/employeeRouter");
let securityEmpRouter=require("./Routers/securityEmpRouter");
let authRouter=require("./Routers/authRouter");
let attendanceRouter= require("./Routers/attendancerouter");
let adminRouter=require("./Routers/adminRouter");
let cors=require("cors");
let verifyToken = require("./verifyToken");
let socket = require("socket.io")

//1- open server
let server=express();
server.use(cors()); 

//connect to mongo db
mongoose.connect("mongodb://localhost:27017/attendenceSystem",{ useNewUrlParser: true,useUnifiedTopology: true  })
        .then(()=>{ console.log("DB Connected")})
        .catch((error)=>{console.log(error+"");})
//2- listen to port number
let app = server.listen(8010,()=>{
    console.log("I am listening on 8010.....");
});

let sio = socket(app);


//middlewares
server.use((request,response,next)=>{
    console.log(request.url,request.method);
    next();
});

//setting
server.use(express.static(path.join(__dirname,"public")));
server.use(express.static(path.join(__dirname,"node_modules")));
server.use(express.urlencoded({extended:false})); // parseing http body 
server.use(express.json());

///Routing 
server.get(["/","/home"],(request,response)=>{
    response.send('welcome in home page')
});

server.use(authRouter);

server.use("/employees",employeeRouter);
server.use("/securityEmp",securityEmpRouter);
server.use(attendanceRouter);
server.use("/admin",adminRouter);

server.use((request,response)=>{
    response.send("there is no such route ..... ");
});
//Error MW
server.use((error,request,response,next)=>{
    //error
    response.send(error.errmsg);
})


