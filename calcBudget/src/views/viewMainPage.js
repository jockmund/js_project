import { createNode, EventEmitter } from "../model/helpers"

class ViewMainPage extends EventEmitter{
    constructor() {
        super()

        this.container = document.getElementById('app')
    }

    renderPage() {
        this.render()

        this.removeScroll()

        this.buttonsEventListener()
    }

    removeScroll() {
        if (!this.container.style.overflow)
            return

        this.container.style.overflow = null
    }

    render() {
        const btn7 = createNode('button', { className: 'btn-number' }, '7')
        const btn8 = createNode('button', { className: 'btn-number' }, '8')
        const btn9 = createNode('button', { className: 'btn-number' }, '9')
        const row1 = createNode('div', { className: 'row' }, btn7, btn8, btn9)

        const btn4 = createNode('button', { className: 'btn-number' }, '4')
        const btn5 = createNode('button', { className: 'btn-number' }, '5')
        const btn6 = createNode('button', { className: 'btn-number' }, '6')
        const row2 = createNode('div', { className: 'row' }, btn4, btn5, btn6)

        const btn3 = createNode('button', { className: 'btn-number' }, '3')
        const btn2 = createNode('button', { className: 'btn-number' }, '2')
        const btn1 = createNode('button', { className: 'btn-number' }, '1')
        const row3 = createNode('div', { className: 'row' }, btn1, btn2, btn3)

        const btn0 = createNode('button', { className: 'btn-number zero' }, '0')
        const btnComma = createNode('button', { className: 'btn-number comma' }, ',')
        const row4 = createNode('div', { className: 'row' }, btn0, btnComma)

        const nums = createNode('div', { className: 'nums' }, row1, row2, row3, row4)

        const btnBack = createNode('button', { className: 'btn-back' }, '<-')
        const btnEnter = createNode('button', { className: 'btn-enter' }, 'Go')

        const btnEdits = createNode('div', { className: 'btn-edits' }, btnBack, btnEnter)

        const inputButtons = createNode('div', { className: 'input-buttons' }, nums, btnEdits)

        const inputNumber = createNode('input', { className: 'inp', id: 'input-number',
            placeholder: '0', readOnly: true })

        const inputLabel = createNode('label', { className: 'input-label' }, inputNumber)

        const inputArea = createNode('div', { className: 'input-area' }, inputLabel, inputButtons)

        const line = createNode('hr')
        const labelToday = createNode('label', { className: 'inp', id: 'label-today' }, '0')
        const today = createNode('div', { className: 'today' }, labelToday, line)

        this.container.append(today, inputArea)
    }

    buttonsEventListener() {
        const buttons = this.container.querySelectorAll('.btn-number')
        const input = this.container.querySelector('#input-number')

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.textContent === ',') {
                    if (input.value.includes('.'))
                        return

                    if (input.value.length === 0)
                        input.value += 0

                    input.value += '.'
                    return;
                }
                input.value += btn.textContent
            })
        })

        const btnBack = this.container.querySelector('.btn-back')

        btnBack.addEventListener('click', () => {
            input.value = input.value.slice(0, -1)
        })

        const btnEnter = this.container.querySelector('.btn-enter')

        btnEnter.addEventListener('click', () => {
            this.emit('add', input.value)

            input.value = ''
        })
    }

    showToday(amount) {
        const labelToday = this.container.querySelector('#label-today')

        labelToday.textContent = amount + '\nНа сегодня'
    }

}

export default ViewMainPage