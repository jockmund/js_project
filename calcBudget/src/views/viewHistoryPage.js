import {EventEmitter, createNode} from "../model/helpers";

class ViewHistoryPage extends EventEmitter {
    constructor() {
        super();

        this.container = document.getElementById('app')
    }



    render(history) {
        this.addScroll()

        history.forEach(data => {
            const record = this.createRecord(data)
            this.container.appendChild(record)
        })

        this.buttonsAddEventListener()
    }

    addScroll() {
        if (this.container.style.overflow)
            return

        this.container.style.overflow = 'auto'
    }

    createRecord(record) {
        const labelAmount = createNode('label', { className: 'money' }, record.amount.toString())
        const labelDate = createNode('label', { className: 'day' }, record.dateTime.toString())
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

    deleteRecord(idRecord) {
        const delRecord = this.findRecordItem(idRecord)

        this.container.removeChild(delRecord)
    }
}

export default ViewHistoryPage