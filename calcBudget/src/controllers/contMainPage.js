import { EventEmitter } from "../model/helpers"


class ContMainPage extends EventEmitter{
    constructor(model, view) {
        super()

        this.model = model
        this.view = view

        this.view.on('add', this.addRecord.bind(this))
    }

    addRecord(amount) {
        this.view.addToToday(amount)

        this.model.addRecord(amount)
    }
}

export default ContMainPage