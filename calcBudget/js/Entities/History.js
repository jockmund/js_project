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