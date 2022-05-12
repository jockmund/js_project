import {EventEmitter, createNode, dateFormatting} from "../model/helpers";

class ViewHistoryPage extends EventEmitter {
    constructor() {
        super();

        this.container = document.getElementById('app')
    }

    renderPage(history) {
        this.addScroll()

        this.render(history)

        this.buttonsAddEventListener()
    }

    render(history) {
        if (history.length === 0) {
            const message = createNode('label', {}, 'Трат пока что нет')
            this.container.appendChild(message)
        } else {
            history.forEach(data => {
                const record = this.createRecord(data)
                this.container.appendChild(record)
            })
        }
    }

    addScroll() {
        if (this.container.style.overflow)
            return

        this.container.style.overflow = 'auto'
    }

    createRecord(record) {
        const labelAmount = createNode('label', { className: 'money' }, record.amount.toString())
        const labelDate = createNode('label', { className: 'day' }, dateFormatting(record.dateTime))
        const recordInfo = createNode('div', { className: 'record-info'}, labelAmount, labelDate)

        const btnDel = createNode('button', { className: 'btn-del' }, 'Удалить')

        const recordItem = createNode('div', { className: 'record', "data-id":  record.id }, recordInfo, btnDel)

        return recordItem
    }

    buttonsAddEventListener() {
        const buttons = this.container.querySelectorAll('.btn-del')

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const recordItem = button.parentNode
                const idRecord = recordItem.getAttribute('data-id')

                this.emit('delete', idRecord)
            })
        })
    }

    findRecordItem(id) {
        return this.container.querySelector(`[data-id="${id}"]`)
    }

    handleDeleteRecord(idRecord) {
        this.deleteRecord(idRecord)

        const records = this.container.querySelectorAll('.record')
        if (records.length === 0) {
            const message = createNode('label', {}, 'Трат пока что нет')
            this.container.appendChild(message)
        }
    }

    deleteRecord(idRecord) {
        const delRecord = this.findRecordItem(idRecord)

        this.container.removeChild(delRecord)
    }
}

export default ViewHistoryPage