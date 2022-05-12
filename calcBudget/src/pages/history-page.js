import ViewHistoryPage from "../views/viewHistoryPage";
import ContHistoryPage from "../controllers/contHistoryPage";

class HistoryPageComponent {
    constructor(model) {
        this.view = new ViewHistoryPage()
        this.model = model
        this.controller = new ContHistoryPage(this.model, this.view)
    }

    render() {
        this.controller.renderPage()
    }
}

export default HistoryPageComponent