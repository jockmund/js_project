import ViewMainPage from "../views/viewMainPage";
import ContMainPage from "../controllers/contMainPage";

class CalcPageComponent {
    constructor(model) {
        this.view = new ViewMainPage()
        this.model = model
        this.controller = new ContMainPage(this.model, this.view)
    }

    render() {
        this.controller.renderPage()
    }
}

export default CalcPageComponent