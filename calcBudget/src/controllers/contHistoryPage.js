import {EventEmitter, load} from "../model/helpers";

class ContHistoryPage extends EventEmitter {
    constructor(model, view) {
        super();

        this.model = model
        this.view = view

        this.history = load('history')
        this.view.render(this.model.getHistory)

        this.view.on('delete', this.deleteRecord.bind(this))
    }

    deleteRecord(idRecord) {
        this.model.deleteRecord(idRecord)

        this.view.deleteRecord(idRecord)
    }
}

export default ContHistoryPage