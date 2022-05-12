function createNode(nodeType, props, ...children) {
    const node = document.createElement(nodeType)

    for (const prop in props) {
        if (props.hasOwnProperty(prop)) {
            if (prop.startsWith('data-'))
                node.setAttribute(prop, props[prop])
            else
                node[prop] = props[prop]
        }
    }

    children.forEach(child => {
        if (typeof child === "string") {
            child = document.createTextNode(child)
        }

        node.appendChild(child)
    })

    return node
}

function dateFormatting(date) {
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
    const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const resultDate = date.getDate() + ' ' + months[date.getMonth()] + ', ' + hours + ':' + minutes
    return resultDate
}

function load(dataName) {
    const stringData = localStorage.getItem(dataName)
    const data = JSON.parse(stringData)

    return data
}

function save(args) {
    const stringData = JSON.stringify(args.data)

    localStorage.setItem(args.dataName, stringData)
}

function isToday(dateTime) {
    const currDay = new Date()
    return dateTime.getDate() === currDay.getDate() &&
        dateTime.getMonth() === currDay.getMonth() &&
        dateTime.getFullYear() === currDay.getFullYear()
}

function cutURL(url) {
    // const pattern = /\/.+\//
    // const pattern = /(\/[^\?#]*(?=.*?\/)\/)/ Можно доделать с целью интереса

    const objURL = new URL(url)

    return objURL.pathname

}

class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(type, callback) {
        this.events[type] = this.events[type] || []
        this.events[type].push(callback)
    }

    emit(type, arg) {
        if (this.events[type]) {
            this.events[type].forEach(callback => callback(arg))
        }
    }
}

export {load, save, isToday, createNode, EventEmitter, cutURL, dateFormatting}