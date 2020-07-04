const draggable = document.querySelectorAll(".draggable");
const board = document.querySelectorAll(".board");
const task_text = document.getElementById("add");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");

const n1 = document.getElementById("n1");
const n2 = document.getElementById("n2");
const n3 = document.getElementById("n3");

var num1 = 0;
var num2 = 0;
var num3 = 0;



function addcheck() {
    if (!task_text.value) {
        alert("task cannot be empty");
    } else {
        addtask(task_text.value);
        task_text.value = "";
        console.log("stage 1 working")
    }
}

function addtask(task) {
    num1++;
    n1.innerText = num1;
    let task_box1 = document.createElement("div");
    task_box1.setAttribute("class", "task");
    task_box1.setAttribute("draggable", "true");
    // task_box1.setAttribute("id", "t" + num1);
    task_box1.innerHTML = task;
    b1.appendChild(task_box1);
    console.log("stage 2 working");
}


draggable.forEach(draggable => {
    draggable.addEventListener("dragstart", () => {
        draggable.classList.add("dragging");
    })
    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("dragging");
    })
})


board.forEach(board => {
    board.addEventListener("dragover", e => {
        e.preventDefault();
        const afterEle = getDrag(board, w.clientY)
        const dd = document.querySelector(".dragging");

        if (afterEle == null) {
            board.appendChild(dd);
        } else {
            board.insertBefore(dd, afterEle);
        }
    })
})


function getDrag(board, y) {
    var dragEle = board.querySelectorAll(".draggable:not(.dragging)");
    console.log(dragEle);
    return dragEle.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = box.top - box.height / 2;
        if (offset < 0 && closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}