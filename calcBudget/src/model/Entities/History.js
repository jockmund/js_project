import {isToday} from "../helpers";

// Сущность Истории
class History {
    constructor(records = []) {
        // records список трат
        this.records = records
    }

    // Добавление траты в историю
    addRecord(record) {
        this.records.unshift(record)
    }

    // Удаление траты из истории
    deleteRecord(idRecord) {
        this.records = this.records.filter(record => record.id != idRecord)
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