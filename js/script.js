function getTodos() {
  const todosString = localStorage.getItem("todos");
  return todosString ? JSON.parse(todosString) : [];
}

function saveTodos(todos) {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  const todoInput = document.getElementById("todoInput");
  const authorInput = document.getElementById("authorInput");
  const yearInput = document.getElementById("yearInput");

  const title = todoInput.value.trim();
  const author = authorInput.value.trim();
  const year = parseInt(yearInput.value);

  if (title === "") return;

  const todos = getTodos();
  const id = Date.now();
  const isComplete = false;
  todos.push({ id, title, author, year, isComplete });
  saveTodos(todos);

  todoInput.value = "";
  authorInput.value = "";
  yearInput.value = "";

  displayTodos();
}

function toggleTodoStatus(id) {
  const todos = getTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.isComplete = !todo.isComplete;
    saveTodos(todos);
    displayTodos();
  }
}

function deleteTodo(id) {
  const todos = getTodos();
  const indexToDelete = todos.findIndex((todo) => todo.id === id);

  if (indexToDelete !== -1) {
    todos.splice(indexToDelete, 1);
    saveTodos(todos);
    displayTodos();
  }
}

function displayTodos() {
  const todoListNotRead = document.getElementById("todoListNotRead");
  const todoListRead = document.getElementById("todoListRead");
  const todos = getTodos();

  todoListNotRead.innerHTML = "";
  todoListRead.innerHTML = "";

  todos.forEach((todo) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <div class="todo-item">
        <label class="todo-label">Click jika sudah dibaca:</label>
            <input type="checkbox" ${
              todo.isComplete ? "checked" : ""
            } onchange="toggleTodoStatus(${todo.id})">
            <label class="todo-label">Judul:</label>
            ${todo.title}
            <label class="todo-label">Penulis:</label>
            ${todo.author}
            <label class="todo-label">Tahun:</label>
            ${todo.year}<br>
            <button onclick="deleteTodo(${todo.id})">Hapus</button>
        </div>
    `;

    listItem.classList.add("todo-item");

    document
      .getElementById(todo.isComplete ? "todoListRead" : "todoListNotRead")
      .appendChild(listItem);
    if (todo.isComplete) {
      todoListRead.appendChild(listItem);
    } else {
      todoListNotRead.appendChild(listItem);
    }
  });

  toggleTodoLists();
}

function toggleTodoLists() {
  const todoListNotRead = document.getElementById("todoListNotRead");
  const todoListRead = document.getElementById("todoListRead");

  if (todoListNotRead.children.length > 0) {
    todoListNotRead.classList.remove("hidden");
  } else {
    todoListNotRead.classList.add("hidden");
  }

  if (todoListRead.children.length > 0) {
    todoListRead.classList.remove("hidden");
  } else {
    todoListRead.classList.add("hidden");
  }
}

displayTodos();
