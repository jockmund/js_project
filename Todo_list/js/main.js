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

    bindEvents(todoItem)

    return todoItem
}

function bindEvents(todoItem) {
    const checkbox = todoItem.querySelector('.checkbox')
    const editButton = todoItem.querySelector('button.edit')
    const deleteButton = todoItem.querySelector('button.delete')

    checkbox.addEventListener('change,', checkTodoState)
    editButton.addEventListener('click', editTodoItem)
    deleteButton.addEventListener('click', deleteTodoItem)
}

function addEventListener(node, type, fn) {
    node.addEventListener(type, fn)
}

function removeEventListener(node, type, fn) {
    node.removeEventListener(type, fn)
}
function addTodoItem(event) {
    event.preventDefault();

    if (!addInput.value) {
        return alert("Название задачи не введено!")
    }

    const todoItem = createTodoItem(addInput.value)

    todoList.appendChild(todoItem)

    addInput.value = ''
}

function checkTodoState(event) {
    const currTodoCheck = event.target
    const todoItem = currTodoCheck.parentNode

    todoItem.classList.toggle('completed')
}

function deleteTodoItem(event) {
    const delBtn = event.target
    const todoItem = delBtn.parentNode

    todoList.removeChild(todoItem)
}

function editTodoItem(event) {
    const editBtn = event.target
    const todoItem = editBtn.parentNode

    todoItem.classList.add('editing')

    const todoTextField = todoItem.querySelector('.textfield')
    const todoTitle = todoItem.querySelector('.title')

    todoTextField.value = todoTitle.textContent

    addEventListener(todoTextField, 'keydown', changeTodoTitle)
}

function changeTodoTitle(event) {
    const todoTextField = event.target
    const todoItem = todoTextField.parentNode

    if (event.key === "Escape") {
        todoItem.classList.remove('editing')
        removeEventListener(todoTextField, 'keydown', changeTodoTitle)
        return
    }
    if (event.key === "Enter") {
        if (!todoTextField.value) {
            alert('Название задачи не введено!')
            return
        }
        const todoTitle = todoItem.querySelector('.title')
        todoTitle.textContent = todoTextField.value

        todoItem.classList.remove('editing')
        removeEventListener(todoTextField, 'keydown', changeTodoTitle)
    }
}

const todoForm= document.getElementById('todo-form');
const addInput = document.getElementById('add-input');
const todoList = document.getElementById('todo-list');
const todoItems = document.querySelectorAll('.todo-item');

addEventListener(todoForm, 'submit', addTodoItem)
addEventListener(document.querySelector('input[type=checkbox]'), 'change', checkTodoState)
addEventListener(document.querySelector('.delete'), 'click', deleteTodoItem)
addEventListener(document.querySelector('.edit'), 'click', editTodoItem)
