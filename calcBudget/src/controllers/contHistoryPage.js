import {EventEmitter} from "../model/helpers";

class ContHistoryPage extends EventEmitter {
    constructor(model, view) {
        super();

        this.model = model
        this.view = view

        this.view.on('delete', this.deleteRecord.bind(this))
    }

    renderPage() {
        this.view.renderPage(this.model.getHistory)
    }

    deleteRecord(idRecord) {
        this.model.deleteRecord(idRecord)

        this.view.handleDeleteRecord(idRecord)
    }
}

export default ContHistoryPage