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

export default Budget