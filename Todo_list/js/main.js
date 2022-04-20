function createNode(nodeType, classList, textContent, type) {
    const node = document.createElement(nodeType)

    if (type) node.type = type

    if (classList.length > 0) node.classList = classList

    if (textContent) node.textContent = textContent

    return node
}



function createTodoItem(title) {
    const todoItem = document.createElement('li')
    todoItem.classList = ["todo-item"]

    // Дочерние элементы todoItem
    const checkbox = createNode('input', ['checkbox'], '', 'checkbox')

    const label = createNode('label', ['title'], title, '')

    const input = createNode('input', ['textfield'], '', 'text')

    const btnEdit = createNode('button', ['edit'], 'Изменить', '')

    const btnDel = createNode('button', ['delete'], 'Удалить', '')

    todoItem.appendChild(checkbox)
    todoItem.appendChild(label)
    todoItem.appendChild(input)
    todoItem.appendChild(btnEdit)
    todoItem.appendChild(btnDel)

    return todoItem
}

function addEventListener(node, type, fn) {
    node.addEventListener(type, fn)
}

function addTodoItem(event) {
    event.preventDefault();

    if (!addInput.value) {
        return alert("Название задачи не введено!")
    }

    const todoItem = createTodoItem(addInput.value)

    addEventListener(todoItem.querySelector('input[type=checkbox]'), 'change', checkTodoState)
    addEventListener(todoItem.querySelector('.delete'), 'click', deleteTodoItem)

    todoList.appendChild(todoItem)

    addInput.value = ''
}

function checkTodoState(event) {
    const currTodoCheck = event.target
    const todoItem = currTodoCheck.parentNode

    if (currTodoCheck.checked) {
        todoItem.classList.add('completed')
    } else {
        todoItem.classList.remove('completed')
    }
}

function deleteTodoItem(event) {
    const currBtn = event.target
    const todoItem = currBtn.parentNode

    todoList.removeChild(todoItem)
}

function editTodoItem(event) {
    const currBtn = event.target
    const todoItem = currBtn.parentNode

    const todoTextField = todoItem.querySelector('input[type=text]')

    console.log(todoTextField.data)

    todoTextField.focus()
}

const todoForm= document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

addEventListener(todoForm, 'submit', addTodoItem)
addEventListener(document.querySelector('input[type=checkbox]'), 'change', checkTodoState)
addEventListener(document.querySelector('.delete'), 'click', deleteTodoItem)
addEventListener(document.querySelector('.edit'), 'click', editTodoItem)
