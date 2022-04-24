import {createNode, findDomItems} from "./helpers";

class View {
    constructor() {
        this.form = document.getElementById('todo-form')
        this.input = document.getElementById('add-input')
        this.list = document.getElementById('todo-list')

        this.form.addEventListener('submit', this.handleAdd.bind(this))
    }


    createElement(todo) {
        const checkbox = createNode('input', {
            type: 'checkbox', className: 'checkbox', checked: todo.completed ? 'checked'
                : ''
        })
        const label = createNode('label', {className: 'title'}, todo.title)
        const editInput = createNode('input', {type: 'text', className: 'textfield'})
        const editButton = createNode('button', {className: 'edit'}, 'Изменить')
        const removeButton = createNode('button', {className: 'remove'}, 'Удалить')
        const todoItem = createNode('li', {
                className: `todo-item ${todo.completed ? 'completed' : ''}`,
                'data-id': todo.id
            },
            checkbox, label, editInput, editButton, removeButton)

        return this.addEventListeners(todoItem)
    }

    addEventListeners(item) {
        const [checkbox, editButton, removeButton] = findDomItems(item, '.checkbox', 'button.edit', 'button.remove')

        checkbox.addEventListener('change', this.handleToggle.bind(this))
        editButton.addEventListener('click', this.handleEdit.bind(this))
        removeButton.addEventListener('click', this.handleRemove.bind(this))

        return item
    }

    handleAdd(event) {
        event.preventDefault()

        if (!this.input.value)
            return alert('Поле с название задачи не заполнено!')

        const value = this.input.value;
        
        // add item to model
    }

    handleToggle({ target }) {
        const listItem = target.parentNode
        const id = listItem.getAttribute('data-id')
        const completed = target.completed

        // update model
    }

    handleEdit({ target }) {
        const listItem = target.parentNode
        const id = listItem.getAttribute('data-id')
        const [label, input, editButton] = findDomItems(listItem, '.title', '.textfield', 'button.edit')
        const title = input.value
        const isEditing = listItem.className.contains('editing')

        if (isEditing) {
            // update model
        } else {
            input.value = label.textContent
            editButton.textContent = 'Сохранить'
            listItem.classList.add('editing')
        }
    }

    handleRemove({ target }) {
        const listItem = target.parentNode

        // remove item from model
    }

    findListItem(id) {
        return this.list.querySelector(`[data-id="${id}"]`)
    }

    addItem(todo) {
        const listItem = this.createElement(todo)

        this.input.value = ''
        this.list.appendChild(listItem)
    }

    toggleItem(todo) {
        const listItem = this.findListItem(todo.id)
        const checkbox = listItem.querySelector('.checkbox')

        checkbox.checked = todo.completed

        if (todo.completed) {
            listItem.classList.add('completed')
        } else {
            listItem.classList.remove('completed')
        }
    }

    editItem(todo) {
        const listItem = this.findListItem(todo.id)
        const [label, input, editButton] = findDomItems(listItem, '.title', '.textfield', 'button.edit')

        label.textContent = todo.title
        editButton.textContent = 'Изменить'
        listItem.classList.remove('editing')
    }

    removeItem(id) {
        const listItem = this.findListItem(id)

        this.list.removeChild(listItem)
    }
}

export default View