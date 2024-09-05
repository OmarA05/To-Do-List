const todoList = JSON.parse(localStorage.getItem('todoList')) || [];

function saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function renderToDoList() {
    let todoListHTML = "";

    for (let i = 0; i < todoList.length; i++) {
        const todoObject = todoList[i];
        const { name, date } = todoObject;

        const html = 
        `<div class="todo-item">
            <div class="todo-name">${name}</div>
            <div class="todo-date">${date}</div>
            <button onclick="deleteItem(${i});" class="deleteItemButton">Delete</button>
        </div>`;

        todoListHTML += html;
    }

    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}

function genratePlaceholder() {
    let todoItem = "";
    const num = Math.random();

    if (0 <= num && num < 1 / 3) {
        todoItem = "Do laundry...";
    } else if (1 / 3 <= num && num < 2 / 3) {
        todoItem = "Clean room...";
    } else if (2 / 3 <= num && num <= 1) {
        todoItem = "Buy Groceries...";
    }
    return todoItem;
}

function changePlaceholder() {
    var inputElement = document.querySelector('.js-name-input');
    inputElement.placeholder = genratePlaceholder();
}

function addItem() {
    const inputElement = document.querySelector(".js-name-input");
    const name = inputElement.value;

    const dateInputElement = document.querySelector(".js-date-input");
    const date = dateInputElement.value;

    if (name && date) {
        todoList.push({ name, date });
        inputElement.value = ""; // Clear input field
        dateInputElement.value = ""; // Clear date field
        changePlaceholder();
        saveToLocalStorage();
        renderToDoList();
    } else {
        alert("Please enter both a task and a date.");
    }
}

function deleteItem(index) {
    todoList.splice(index, 1);
    saveToLocalStorage();
    renderToDoList();
}

changePlaceholder();
renderToDoList();