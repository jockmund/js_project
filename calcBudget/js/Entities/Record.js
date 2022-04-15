// Сущность Траты
class Record {
    constructor(amount, type) {
        // amount - сумма траты, type - тип записи (трата, доход)
        this.type = type
        this.amount = amount
        this.dateTime = new Date()
    }
}