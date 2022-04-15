function isToday(dateTime) {
    const currDay = new Date()
    return dateTime.getDate() === currDay.getDate() &&
        dateTime.getMonth() === currDay.getMonth() &&
        dateTime.getFullYear() === currDay.getFullYear()
}

const budget = new Budget(10000, 10)
const history = new History()

const daily = new DailyAmount(budget, history)

history.addRecord(new Record(100, "spending"))

const qwe = daily.valueOf

const asd = 0