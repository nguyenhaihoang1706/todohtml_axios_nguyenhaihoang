function TaskService(){
    this.arr = [];
    this.getListTaskService = function(){
       return axios({
            url:"https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/todo",
            method:"GET",
        })
    };
    this.addTask = function(task){
        return axios({
            url:"https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/todo",
            method:"POST",
            data:task,
        })
    };
    this.deleteTaskService = function(id){
        return axios({
            url:`https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/todo/${id}`,
            method:"DELETE",
        })
    };

    this.getListTaskByIdService = function(id){
        return axios({
            url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/todo/${id}`,
            method: "GET",
        })
    };

    this.updateTaskService = function(user){
        return axios({
            url: `https://5a6451dcf2bae00012ca1a6a.mockapi.io/api/todo/${user.id}`,
            method: "PUT",
            data:user
        })
    };
    
}