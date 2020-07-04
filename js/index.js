const boards = document.querySelectorAll(".board");
const task_text = document.getElementById("add");
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");

const n1 = document.getElementById("n1");
const n2 = document.getElementById("n2");
const n3 = document.getElementById("n3");

var num = 0;
var num1 = 0;
var num2 = 0;
var num3 = 0;



function addcheck() {
    if (!task_text.value) {
        alert("task cannot be empty");
    } else {
        addtask(task_text.value);
        task_text.value = "";

    }

}

function addtask(task) {
    num++;
    n1.innerText = num;
    let box = document.createElement("div");
    let task_box = document.createElement("div");
    let cross = document.createElement("div");


    box.setAttribute("class", "dragabble");
    box.setAttribute("draggable", "true");
    box.setAttribute("onmouseover", "forDrag(this)");
    box.setAttribute("id", "t" + num);
    task_box.setAttribute("class", "txt");
    cross.setAttribute("class", "cross");
    cross.setAttribute("id", num);
    cross.setAttribute("onclick", "del(this)");

    cross.innerHTML = "x";
    task_box.innerHTML = task;

    b1.appendChild(box);
    box.appendChild(task_box);
    box.appendChild(cross);

}

function del(task_d) {
    let id = "t" + task_d.id;
    let p = document.getElementById(id);
    p.parentNode.removeChild(p);
    num--;
}


function forDrag(task) {
    task.addEventListener("dragstart", () => {
        task.classList.add("dragging");
    })
    task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
    })
}


boards.forEach(board => {
    board.addEventListener("dragover", e => {
        e.preventDefault();
        const afterEle = getDrag(board, e.clientY)
        const dd = document.querySelector(".dragging");

        if (afterEle == null) {
            board.appendChild(dd);
        } else {
            board.insertBefore(dd, afterEle);
            console.log("insert before working")
        }
    })
})


function getDrag(board, y) {
    // console.log(board, y)
    var dragEle = getEle(board);
    return dragEle.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = box.top - box.height / 2;
        console.log("get drag working")
        if (offset < 0 && closest.offset) {
            return { offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}


function getEle(board) {
    // console.log([...board.querySelectorAll(".draggable:not(.dragging)")])
    return [...board.querySelectorAll(".draggable:not(.dragging)")]
}