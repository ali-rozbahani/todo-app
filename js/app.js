const app = document.querySelector("#app");
let addButton = document.querySelector(".addbutton");
let addInput = document.querySelector(".createiteminput");
let todoItem = [];


if (localStorage.getItem("todo") == undefined){
    localStorage.setItem("todo",JSON.stringify(todoItem));
}
todoItem = JSON.parse(localStorage.getItem("todo"));

class item {
    constructor (name){
        this.createItem(name);
    }
    createItem(name){
        let itemBox = document.createElement("div");
        itemBox.classList.add("item");

        let input = document.createElement("input");
        input.disabled = true;
        input.type = "text";
        input.value = name;
        input.classList.add("inputbox");

        let btndelete = document.createElement("button");
        btndelete.classList.add("deletebtn");
        btndelete.innerHTML = "Delete";
        btndelete.addEventListener("click",() => this.deleteItem(itemBox,name))

        let btnedit = document.createElement("button");
        btnedit.classList.add("editbtn");
        btnedit.innerHTML = "Edit";
        btnedit.addEventListener("click",() => this.editItem(input,name))

        app.appendChild(itemBox);

        itemBox.appendChild(input);
        itemBox.appendChild(btndelete);
        itemBox.appendChild(btnedit);
    }

    deleteItem(itemBox,name){
        itemBox.parentNode.removeChild(itemBox);
        let index = todoItem.indexOf(name);
        todoItem.splice(index,1);
        localStorage.setItem("todo",JSON.stringify(todoItem))
    }

    editItem(input,name){
        input.disabled = !input.disabled
        let index = todoItem.indexOf(name);
        todoItem[index] = input.value;
        localStorage.setItem("todo",JSON.stringify(todoItem))
    }
}

addButton.addEventListener("click",addItem);
window.addEventListener("keydown",(e) => {
    if(e.which == 13){
        addItem();
    }
})

function addItem(){
    if(addInput.value != ""){
        new item(addInput.value);
        todoItem.push(addInput.value);
        localStorage.setItem("todo",JSON.stringify(todoItem));
        addInput.value = "";
    }
}


for (let i = 0; i < todoItem.length; i++) {
    new item(todoItem[i]);
}