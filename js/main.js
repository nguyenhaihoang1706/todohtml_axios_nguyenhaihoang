var taskList = new TaskService();
DSTaskService();
var isload = false;
//Danh sách hiển thị
function DSTaskService(){
    taskList.getListTaskService()
    isload = true;
    loadCheck();
    taskList.getListTaskService()
    .then(function(result){
        isload = false;
        loadCheck();
        taoBang(result.data);
    })
    .catch(function(err){
        console.log(err);
    })
}

//Kiểm tra validation
function  validation(notiInput,input) {
    var taskInfo = getEle(notiInput).value;
    var check = true;
    if(taskInfo === ""){
        getEle(input).innerHTML =alert("Vui lòng nhạp đầy đủ thông tin");
        check = false;
    }
    return check;
}

//Thêm Task
getEle("addItem").addEventListener("click",function(){
    if(validation("newTask","notiInput")){
    var newTask = getEle("newTask").value;
    var id ="";
    var usertask = new Task(id,newTask,"todo");
    isload = true;
    loadCheck();
    taskList.addTask(usertask)
        .then(function(){
            DSTaskService();
        })
        .catch(function(err){
            console.log(err);
        })
    }
});

//Xóa Task
function deleteTask(id){
    isload = true;
    loadCheck();
    taskList.deleteTaskService(id)
            .then(function(result){
                DSTaskService();
            })
            .catch(function(err){
                console.log(err);
            })
}


//Thay đổi trạng thái
function changeStatus(id){
    isload = true;
    loadCheck();
    taskList.getListTaskByIdService(id)   
    .then(function(task){
        updateTask(task);
    })
    .catch(function(err){
        console.log(err);
    })
}

function updateTask(task){
    var taskGetId = task.data;
    taskGetId.status = taskGetId.status === "todo" ? "completed" : "todo";
    taskList.updateTaskService(taskGetId)
            .then(function(){
                DSTaskService();
            })
            .catch(function(err){
                console.log(err);
            })

}


function taoBang(arr){
    var todo = "";
    var todoCompleted = "";
   for(var i=0; i<arr.length; i++){
       if(arr[i].status === "todo"){
       todo += `
                <li>
                <span>${arr[i].textTask}</span>
                <div class="text-right">
                <span onclick="deleteTask('${arr[i].id}')" class="buttons" style="cursor: pointer"
                    ><i class="fa fa-trash"></i
                ></span>
                <span onclick="changeStatus('${arr[i].id}')" class="buttons" style="cursor: pointer"
                    ><i class="fa fa-undo"></i
                ></span>
                </li>
                `;
        }else if(arr[i].status === "completed"){
            todoCompleted += `
                <li>
                    <span>${arr[i].textTask}</span>
                    <div class="text-right">
                    <span onclick="deleteTask('${arr[i].id}')" class="buttons" style="cursor: pointer"
                        ><i class="fa fa-trash"></i
                    ></span>
                    <span onclick="changeStatus('${arr[i].id}')" class="buttons" style="cursor: pointer"
                        ><i class="fa fa-undo"></i
                    ></span>
                </li>
                `;
        }
   }
   getEle("todo").innerHTML = todo;
   getEle("completed").innerHTML = todoCompleted;
}

function  loadCheck() {
        if(isload){
            getEle("loading").style.display = "block";
            return;
        }
        getEle("loading").style.display = "none";
}

function getEle(id){
    return document.getElementById(id);
}