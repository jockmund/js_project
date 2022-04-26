import {isToday} from "../helpers";

// Сущность Истории
class History {
    constructor(records = []) {
        // records список трат
        this.records = []
    }

    // Добавление траты в историю
    addRecord(record) {
        this.records.push(record)
    }

    get history() {
        return this.records
    }

    get spentToday() {
        return this.records.reduce((result, record) => {
            return (result += isToday(record.dateTime) ? record.amount : 0)
        }, 0)
    }
}

export default History