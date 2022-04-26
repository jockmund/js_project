import ViewMainPage from "./views/viewMainPage";
import Model from "./model/model";
import ContMainPage from "./controllers/contMainPage";

const model = new Model()
const view = new ViewMainPage()
const controller = new ContMainPage(model, view)