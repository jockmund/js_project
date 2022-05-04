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

export default DailyAmount