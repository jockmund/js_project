import { EventEmitter } from "../model/helpers"


class ContMainPage extends EventEmitter{
    constructor(model, view) {
        super()

        this.model = model
        this.view = view

        this.view.on('add', this.changeBudget.bind(this))
        this.model.on('giveDailyAmount', this.showToday.bind(this))
    }

    changeBudget(amount) {
        this.model.addRecord(+amount)
    }

    showToday(dailyAmount) {
        this.view.showToday(dailyAmount)
    }
}

export default ContMainPage