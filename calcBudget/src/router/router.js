import {EventEmitter} from "../model/helpers";



class Router extends EventEmitter{
    /**
     * Создает роутер для отслеживания ссылок и отрисовки содержимого под конкретную ссылку
     *
     * @param {Array} router - Содержит объекты с информацией о ссылке
     */
    constructor(router) {
        super()

        this.router = router
        this.on('pathchange', this.drawPage.bind(this))
    }

    drawPage(view, controller) {

    }


}

export default Router