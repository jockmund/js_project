class Model {
    constructor(state = []) {
        this.state = state;

    }

    getItem(id) {
        // id - todo id
        return this.state.find(el => el.id == id)
    }

    addItem(item) {
        // item - todo item
        this.state.push(item)
        return this.state.findIndex(el => el === item)
    }

    updateItem(id, data) {
        // id - changed todo item id, data - changed todo data is Object
        const item = this.getItem(id)

        Object.keys(data).forEach(prop => item[prop] = data[prop])
    }

    removeItem(id) {
        // id - delete todo item id
        const index = this.state.findIndex(el => el.id == id)

        if (index > -1)
            this.state.splice(index, 1)
    }
}

export default Model;