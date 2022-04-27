import {isToday} from "../helpers";

// Сущность Бюджета
class Budget {
    constructor(amount, daysCount) {
        // amount - общая сумма
        // daysCount - количество дней на которое рассчитывается бюджет
        this.amount = amount
        this.daysCount = daysCount
        this.startDate = new Date()
    }

    changeBudget(type, amount) {
        if (type === "-")
            this.newAmount = this.amount - amount
        else
            this.newAmount = this.amount + amount
    }

    get perDay() {
        return this.amount / this.daysCount
    }
}

export default Budget