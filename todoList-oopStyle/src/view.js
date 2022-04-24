import {createNode, findDomItems, EventEmitter} from "./helpers";

class View extends EventEmitter{
    constructor() {
        super()

        this.form = document.getElementById('todo-form')
        this.input = document.getElementById('add-input')
        this.list = document.getElementById('todo-list')

        this.form.addEventListener('submit', this.handleAdd.bind(this))
    }

    drawTodos(state) {
        state.forEach(todo => {
            this.addItem(todo)
        })
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
                "data-id": todo.id,
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

        this.emit('add', value)
    }

    handleToggle({ target }) {
        const listItem = target.parentNode
        const id = listItem.getAttribute('data-id')
        const completed = target.checked

        this.emit('toggle', { id, completed })
    }

    handleEdit({ target }) {
        const listItem = target.parentNode
        const id = listItem.getAttribute('data-id')
        const [label, input, editButton] = findDomItems(listItem, '.title', '.textfield', 'button.edit')
        const title = input.value
        const isEditing = listItem.classList.contains('editing')

        if (isEditing) {
            this.emit('edit', { id, title })
        } else {
            input.value = label.textContent
            editButton.textContent = 'Сохранить'
            listItem.classList.add('editing')
        }
    }

    handleRemove({ target }) {
        const listItem = target.parentNode
        const id = listItem.getAttribute('data-id')

        this.emit('remove', id)
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