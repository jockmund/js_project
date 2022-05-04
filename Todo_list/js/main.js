const main = (() => {
    function createNode(nodeType, props, ...children) {
        const node = document.createElement(nodeType)

        for (const prop in props) {
            if (props.hasOwnProperty(prop)) {
                node[prop] = props[prop]
            }
        }

        children.forEach(child => {
            if (typeof child === "string") {
                child = document.createTextNode(child)
            }

            node.appendChild(child)
        })

        return node
    }

    function createTodoItem(title) {
        // Дочерние элементы todoItem
        const checkbox = createNode('input', {className: 'checkbox', type: 'checkbox'})

        const label = createNode('label', {className: 'title'}, title)

        const input = createNode('input', {className: 'textfield', type: 'text'})

        const btnEdit = createNode('button', {className: 'edit'}, 'Изменить')

        const btnDel = createNode('button', {className: 'delete'}, 'Удалить')

        //Сам todoItem
        const todoItem = createNode('li', {className: 'todo-item'}, checkbox, label, input, btnEdit, btnDel)

        bindEvents(todoItem)

        return todoItem
    }

    function bindEvents(todoItem) {
        const checkbox = todoItem.querySelector('.checkbox')
        const editButton = todoItem.querySelector('button.edit')
        const deleteButton = todoItem.querySelector('button.delete')

        checkbox.addEventListener('change', checkTodoState)
        editButton.addEventListener('click', editTodoItem)
        deleteButton.addEventListener('click', deleteTodoItem)
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
        const todoTextField = todoItem.querySelector('.textfield')
        const todoTitle = todoItem.querySelector('.title')
        const isEditing = todoItem.classList.contains('editing')

        if (isEditing) {
            todoTitle.innerText = todoTextField.value
            editBtn.innerText = "Изменить"
        } else {
            todoTextField.value = todoTitle.innerText
            editBtn.innerText = "Сохранить"
        }

        todoItem.classList.toggle('editing')
    }

    const todoForm = document.getElementById('todo-form');
    const addInput = document.getElementById('add-input');
    const todoList = document.getElementById('todo-list');
    const todoItems = document.querySelectorAll('.todo-item');


    function main() {
        todoForm.addEventListener('submit', addTodoItem)
        todoItems.forEach(todo => bindEvents(todo))
    }

    return main
})()


main();