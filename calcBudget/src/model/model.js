import Budget from "./Entities/Budget";
import DailyAmount from "./Entities/DailyAmount";
import Record from "./Entities/Record";
import History from "./Entities/History";
import {load, EventEmitter} from "./helpers";

class Model extends EventEmitter{
    constructor(historyData = []) {
        super()

        this.history = new History(historyData)

        const budgetData = load('budget')
        this.budget = new Budget(1000, 10)

        this.dailyAmount = new DailyAmount(this.budget, this.history)

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

}

export default Model