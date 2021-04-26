const toDoForm = document.querySelector(".toDoForm"),
    toDoInput = toDoForm.querySelector("input");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

function loadFinishedToDos() {
    const finishedToDos = localStorage.getItem(FINISHED_LS);
    if (finishedToDos === null){
        console.log("ask for finished todos");
    } else {
        console.log("paint finished todos");
    }
}

function loadPendingToDos(){
    const pendingToDos = localStorage.getItem(PENDING_LS);
    if (pendingToDos === null) {
        console.log("ask for todos");
    } else {
        console.log("paint todos");
    }
}

function init(){
    loadPendingToDos();
    loadFinishedToDos();
}

init();