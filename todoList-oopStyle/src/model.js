import {EventEmitter} from "./helpers";

class Model extends EventEmitter{
    constructor(state = []) {
        super()
        this.state = state;
    }

    getAllItems() {
        return this.state
    }

    getItem(id) {
        // id - todo id
        return this.state.find(el => el.id == id)
    }

    addItem(item) {
        // item - todo item
        this.state.push(item)
        this.emit('change', this.state)
        return item
    }

    updateItem(id, data) {
        // id - changed todo item id, data - changed todo data is Object
        const item = this.getItem(id)

        Object.keys(data).forEach(prop => item[prop] = data[prop])

        this.emit('change', this.state)
        return item
    }

    removeItem(id) {
        // id - delete todo item id
        const index = this.state.findIndex(el => el.id == id)

        if (index > -1)
            this.state.splice(index, 1)

        this.emit('change', this.state)
    }
}

export default Model;