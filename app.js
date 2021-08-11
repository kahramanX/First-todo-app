const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
// 1'den fazla aynı class'tan bir şey varsa, ALL ekle!
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListeners();

function eventListeners() {
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    clearButton.addEventListener("click", clearAllTodos);
};

function addTodo(e) {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {

        showAlert("danger", "Lütfen bir ToDo adı girin.");

    } else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Başarılı, ToDo eklendi.");
    }

    e.preventDefault();
}

function loadAllTodosToUI(){
   let todos = getTodosFromStorage();

    todos.forEach(todo => {
        addTodoToUI(todo);
        
    });
}




function getTodosFromStorage(){      // Storage'den todoları almak
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
        // veri çekerken parse kullan
    }
    return todos;
    //Return ifadesi bir işlevin yürütülmesini durdurur ve bu işlevden bir değer döndürür.
}




function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage(); // todos arrayi geldi

    todos.push(newTodo);

    localStorage.setItem("todos",JSON.stringify(todos));
    //veri yüklerken stringify kullan
}






function showAlert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;

    alert.textContent = message;

    firstCardBody.appendChild(alert);


    //setTimeout

    setTimeout(function () {
        alert.remove();
    }, 1000);
}





function addTodoToUI(newTodo) {
    const listItem = document.createElement("li");
    const link = document.createElement("a");

    listItem.className = "list-group-item d-flex justify-content-between";

    link.innerHTML = '<i class = "fa fa-remove"></i>';
    link.className = "delete-item";
    link.href = "#";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);


    todoList.appendChild(listItem);
    todoInput.value = "";
}





function deleteTodo(e){
    if (e.target.className == "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        showAlert("success","Silindi");
    }
}


function clearAllTodos(){
    
    if (todoList.childNodes.length == 0) {
        showAlert("danger", "Silinecek ToDo yok!");
    }
    else{
        showAlert("success", " HEPSİ SİLİNDİ.");
        localStorage.clear(); // localStorage siliniyor

        while (todoList.children) {
            todoList.removeChild(todoList.firstElementChild);
        }
    }
    
}
