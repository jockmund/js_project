// Сущность Бюджета
class Budget {
    constructor(amount, daysCount) {
        // amount - общая сумма
        // daysCount - количество дней на которое рассчитывается бюджет
        this.amount = amount
        this.daysCount = daysCount
        this.startDate = new Date()
    }

    get perDay() {
        return this.amount / this.daysCount
    }
}

// Сущность Истории
class History {
    // Список трат
    records = []

    // Добавление траты в историю
    addRecord(record) {
        this.records.push(record)
    }

    get spentToday() {
        return this.records.reduce((result, record) => {
            return (result += isToday(record.dateTime) ? record.amount : 0)
        }, 0)
    }
}

// Сущность Траты
class Record {
    constructor(amount) {
        // amount - сумма траты
        this.amount = amount
        this.dateTime = new Date()
    }
}

function isToday(dateTime) {
    const currDay = new Date()
    return dateTime.getDate() === currDay.getDate() &&
        dateTime.getMonth() === currDay.getMonth() &&
        dateTime.getFullYear() === currDay.getFullYear()
}

class DailyAmount {
    constructor(budget, history) {
        // budget - экземпляр Budget
        // history - экземпляр History
        this.budget = budget
        this.history = history
    }

    get valueOf() {
        return this.budget.perDay - this.history.spentToday
    }
}

const budget = new Budget(10000, 10)
const history = new History()

const daily = new DailyAmount(budget, history)

history.addRecord(new Record(100))

const qwe = daily.valueOf

const asd = 0