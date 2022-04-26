import Budget from "./Entities/Budget";
import DailyAmount from "./Entities/DailyAmount";
import Record from "./Entities/Record";
import History from "./Entities/History";
import {load} from "./helpers";

class Model {
    constructor(historyData = []) {
        this.history = new History(historyData)

        const budgetData = load('budget')
        this.budget = new Budget(1000, 10)

        this.dailyAmount = new DailyAmount(this.budget, this.history)

    }

    addRecord(amount) {
        const record = new Record(amount)

        this.history.addRecord(record)
    }

}

export default Model