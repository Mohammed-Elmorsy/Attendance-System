$(()=>{ //load

    $.ajax({
        url: "http://localhost:8085/departments/list",
        method:"get",
        dataType: "json",
        success: function(result){
           for(department of result){
               $("#departmentsTable").append(`<tr>
               <td>${department._id}</td>
               <td>${department.name}</td>
               <td>${department.location}</td>
               </tr>`)
           }
           console.log(result);
        },
        error:function(error){
            console.log(error);
        }
    });

    $("#add").on("click",function(){ //add button
         let _id = $("input[name=id]").val();
         let name = $("input[name=name]").val();
         let location = $("input[name=location]").val();
         let departmentData = {_id,name,location};
         console.log(departmentData);
        $.ajax({
            url: "http://localhost:8085/departments/add",
            method:"POST",
            dataType: "json",
            contentType:"application/json",
            data:JSON.stringify(departmentData),   
            success: function(result){
                   $("#departmentsTable").append(`<tr>
                   <td>${departmentData._id}</td>
                   <td>${departmentData.name}</td>
                   <td>${departmentData.location}</td>
                   </tr>`)
               console.log(result);
            },
            error:function(error){
                console.log(error);
            }
        })
    })//onclick

})