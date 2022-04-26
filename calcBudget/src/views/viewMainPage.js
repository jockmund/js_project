import { createNode, EventEmitter } from "../model/helpers"

class viewMainPage extends EventEmitter{
    constructor() {
        super()

        this.container = this.render()

        this.ButtonsEventListener()
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
        const today = createNode('div', { className: 'today' }, line, '0')

        const container = document.getElementById('app')
        container.append(today, inputArea)

        return container
    }

    ButtonsEventListener() {
        const buttons = this.container.querySelectorAll('.btn-number')
        const input = this.container.querySelector('#input-number')

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.textContent === ',') {
                    if (input.value.includes(btn.textContent))
                        return

                    if (input.value.length === 0)
                        input.value += 0
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

    addToToday(amount) {
        const labelToday = this.container.querySelector('.today')

        if (labelToday.textContent === "0")
            labelToday.textContent = amount
        else
            labelToday.textContent = +labelToday.textContent + +amount
    }

}

export default viewMainPage