let express = require("express");
let path = require("path");
let mongoose = require("mongoose");
require("../Models/employeeDataModel");
let employeeSchema = mongoose.model("employees");
require("../Models/attendenceModel.js");
let attendenceSchema = mongoose.model("attendences");
let attendanceRouter = express.Router();

const getCurrentDay = function getDay() { return new Date().toDateString() };

attendanceRouter.get("/leaving/list", (request, response) => {
    attendenceSchema.find({ leavingTime: null }).distinct('empID').populate('empID', { 'firstName': 1, 'lastName': 1 })
        .then((data) => {
            response.send(data);
        })
        .catch((error) => {
            response.send("request employees " + error)
        })
})//end of dailyreport 

//add
attendanceRouter.post("/attendence/add", async (request, response) => {

    const attedanceTime = request.body.attendenceTime;
    const hour = parseInt(attedanceTime.split(':')[0]);
    const min = parseInt(attedanceTime.split(':')[1]);

    try {
        if ((hour == 9 && min > 5) || hour > 9) {
            const attendanceAdded = await attendenceSchema.create({
                empID: request.body.empID,
                day: request.body.day,
                attendenceTime: request.body.attendenceTime,
                month:new Date().getMonth(),
                late: true
            });

            if (attendanceAdded) {
                const addEmployeePresence = await employeeSchema
                .updateOne({_id: request.body.empID},{$set: { presenceDay: getCurrentDay() } })
            }
        }
        else {
            const attendanceAdded = await attendenceSchema.create({
                empID: request.body.empID,
                day: request.body.day,
                attendenceTime: request.body.attendenceTime,
                month:new Date().getMonth(),
                late: false
            });

            if (attendanceAdded) {
                const addEmployeePresence = await employeeSchema
                .updateOne({_id: request.body.empID},{$set: { presenceDay: getCurrentDay() } })
            }
        }
    }
    catch (err) {
        console.log('from catch ..' + err);
    }
});//end of post add 

attendanceRouter.post("/leaving/add", (request, response) => {

    attendenceSchema.updateOne({ empID: request.body.empID }, {

        $set: {
            leavingTime: request.body.LeavingTime
        }
    }).then((data) => { response.send(data); })
        .catch((error) => { response.send("update Attendance date and time error" + error) });
});//end of put update

attendanceRouter.get("/monthlyReport", (request, response) => {
    attendenceSchema.find({ empID:request.query.empID ,month:request.query.month  })
        .populate('empID',{firstName:1, lastName:1})
        .then((data) => {
            console.log(request.query.empID, request.query.month)
            console.log('report success '+data)
            response.send(data);  
        })
        .catch((error) => {
            console.log('report error '+error)
            response.send("request employees " + error)
        })
})//end of get 

module.exports = attendanceRouter;
