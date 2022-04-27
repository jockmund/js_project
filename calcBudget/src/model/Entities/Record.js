// Сущность Траты
class Record {
    constructor(amount) {
        // amount - сумма траты
        this.id = Date.now()
        this.amount = amount
        this.dateTime = new Date()
    }
}

export default Record