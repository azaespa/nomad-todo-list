const toDoForm = document.querySelector(".toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    pendingToDoContainer = document.querySelector(".pendingToDoContainer"),
    pendingToDoList = pendingToDoContainer.querySelector("ul"),
    finishedToDoContainer = document.querySelector(".finishedToDoContainer"),
    finishedToDoList = finishedToDoContainer.querySelector("ul");


const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";
let pendingToDos = [];
let finishedToDos = [];

function handleClickReturnBtn(event){
    console.log("return button is working!!!")
}

function paintFinishedToDos(object){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const returnBtn = document.createElement("button");
    const id = object.id;

    span.innerText = object.text;
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", handleClickDeleteBtn);
    returnBtn.innerText = "⏪";
    returnBtn.addEventListener("click", handleClickReturnBtn);
    
    li.append(span);
    li.append(deleteBtn);
    li.append(returnBtn);
    li.id = id;
    finishedToDoList.append(li);

    finishedToDos.push(object);
    saveFinishedToDos();
}

function saveFinishedToDos(){
    localStorage.setItem(FINISHED_LS, JSON.stringify(finishedToDos));
}

function savePendingToDos(){
    localStorage.setItem(PENDING_LS, JSON.stringify(pendingToDos));
}

function handleClickFinishedBtn(event) {
    const li = removeFromList(event);
    const cleanToDos = pendingToDos.filter(function(toDo){
        return toDo.id !== Number(li.id);
    });
    const finishedToDoObj = pendingToDos.find(function(toDo){
        return toDo.id === Number(li.id);
    })
    pendingToDos = cleanToDos;
    savePendingToDos();
    paintFinishedToDos(finishedToDoObj);
}

function removeFromList(event){
    const btn = event.target;
    const li = btn.parentNode;
    return li.parentNode.removeChild(li);
}

function handleClickDeleteBtn(event){
    const li = removeFromList(event);
    const cleanToDos = pendingToDos.filter(function(toDo) {
        return toDo.id !== Number(li.id);
    })
    pendingToDos = cleanToDos;
    savePendingToDos();
}

function paintPendingToDos(text){
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteBtn = document.createElement("button");
    const finishedBtn = document.createElement("button");
    const date = new Date();
    const id = date.getTime();

    span.innerText = text;
    deleteBtn.innerText = "❌";
    deleteBtn.addEventListener("click", handleClickDeleteBtn);
    finishedBtn.innerText = "✔️";
    finishedBtn.addEventListener("click", handleClickFinishedBtn);

    li.append(span);
    li.append(deleteBtn);
    li.append(finishedBtn);
    li.id = id;
    pendingToDoList.append(li);

    const pendingToDosObj = {
        text,
        id
    }

    pendingToDos.push(pendingToDosObj);
    savePendingToDos();
}

function handleSubmitToDo(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintPendingToDos(currentValue);
    toDoInput.value = "";
}

function loadFinishedToDos() {
    const loadedFinishedToDos = localStorage.getItem(FINISHED_LS);
    if (loadedFinishedToDos !== null){
        console.log("paint to dos");
    }
}

function loadPendingToDos(){
    const loadedPendingToDos = localStorage.getItem(PENDING_LS);
    if (loadedPendingToDos !== null) {
        const parsedPendingToDos = JSON.parse(loadedPendingToDos);
        parsedPendingToDos.forEach(element => {
            paintPendingToDos(element.text);
        });
    }
}

function init(){
    loadPendingToDos();
    loadFinishedToDos();
    toDoForm.addEventListener("submit", handleSubmitToDo);
}

init();