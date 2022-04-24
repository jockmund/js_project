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

function findDomItems(node, ...selectors) {
    let resItems = []
    selectors.forEach(selector =>
        resItems.push(node.querySelector(selector))
    )
    return resItems
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

function save(data) {
    const string = JSON.stringify(data)

    localStorage.setItem('todos', string)
}

function load() {
    const string = localStorage.getItem('todos')
    const data = JSON.parse(string)

    return data
}

export {createNode, findDomItems, EventEmitter, save, load};