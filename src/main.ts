import './style.css'

interface Todo {

  title: string,
  isCompleted: boolean,
  readonly id: string
}

const todoContainer = document.querySelector('.todoContainer') as HTMLDivElement;
const todoInput = document.querySelector('input') as HTMLInputElement;
const form = document.querySelector('form') as HTMLFormElement;

const todos: Todo[] = [];

form.onsubmit = (e: SubmitEvent) => {

  e.preventDefault();

  const todo: Todo = {

    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random() * 1000)
  }

  todos.push(todo);
  todoInput.value = "";

  renderTodo(todos);
}

const renderTodo = (todos: Todo[]) => {

  todoContainer.innerHTML = "";

  todos.forEach(item => {

    generateTodo(item.title, item.isCompleted, item.id);
  });

}

const generateTodo = (title: string, isCompleted: boolean, id: string) => {

  const todo: HTMLDivElement = document.createElement('div');
  todo.className = "todo";

  // Creating a checkbox
  const checkBox: HTMLInputElement = document.createElement('input');
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "isCompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {

    todos.find(item => {

      if (item.id === id)
        item.isCompleted = checkBox.checked;
    })

    para.className = checkBox.checked ? "textCut" : ""
  }

  // Creating a paragraph
  const para: HTMLParagraphElement = document.createElement('p');
  para.innerText = title;
  para.className = isCompleted ? "textCut" : "";

  // Creating a delete button
  const btn: HTMLButtonElement = document.createElement('button');
  btn.innerText = "X";
  btn.className = "deleteBtn";
  btn.onclick = () => {

    deleteTodo(id);
  }

  // Append
  todo.append(checkBox, para, btn);
  todoContainer.append(todo);
}

const deleteTodo = (id: string) => {

  const idx = todos.findIndex(ele => ele.id === id);
  todos.splice(idx, 1);
  renderTodo(todos);
}