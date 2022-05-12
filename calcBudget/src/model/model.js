import Budget from "./Entities/Budget";
import DailyAmount from "./Entities/DailyAmount";
import Record from "./Entities/Record";
import History from "./Entities/History";
import {load, EventEmitter, save} from "./helpers";

class Model extends EventEmitter{
    constructor(historyData = []) {
        super()

        this.history = new History(historyData)

        const budgetData = load('budget')
        this.budget = new Budget(1000, 10)

        this.dailyAmount = new DailyAmount(this.budget, this.history)

        this.on('save', save)
        this.on('load', load)
    }

    checkEvents() {
        return this.events.length > 0
    }

    addRecord(amount) {
        const record = new Record(amount)

        this.history.addRecord(record)

        this.emit('giveDailyAmount', this.dailyAmount.valueOf)
        this.emit('save', {dataName: 'history', data: this.history.history})
    }

    deleteRecord(idRecord) {
        this.history.deleteRecord(idRecord)

        this.emit('save', {dataName: 'history', data: this.history.history})
    }

    get getHistory() {
        return this.history.history
    }

    getDailyAmount() {
        return this.dailyAmount.valueOf
    }

}

export default Model