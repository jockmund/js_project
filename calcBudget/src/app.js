import Model from "./model/model";

import ViewMainPage from "./views/viewMainPage";
import ContMainPage from "./controllers/contMainPage";

import ViewHistoryPage from "./views/viewHistoryPage";
import ContHistoryPage from "./controllers/contHistoryPage";

import {load, save} from "./model/helpers";

const history = load('history')

const model = new Model(history || undefined)
model.on('save', save)

let view = undefined
let controller = undefined

switch (2) {
    case 1:
        // Компонент Калькулятора
        view = new ViewMainPage()
        controller = new ContMainPage(model, view)
        break

    case 2:
        // Компонент истории
        view = new ViewHistoryPage()
        controller = new ContHistoryPage(model, view)
        break

    case 3:
        break
}
