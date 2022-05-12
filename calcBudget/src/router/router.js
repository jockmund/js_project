import {EventEmitter} from "../model/helpers";

class Router extends EventEmitter{
    /**
     * Создает роутер для отслеживания ссылок и отрисовки содержимого под конкретную ссылку
     *
     * @param {Array} routes - Список объектов типа: { маршрут, компонент }
     */

    constructor(routes) {
        super()

        this.routes = routes
    }

    getUrl() {
        return window.location.hash.slice(1)
    }

    clearPage() {
        const container = document.querySelector('#app')
        const childrenContainer = container.childNodes

        const listNodes = [...childrenContainer]

        listNodes.forEach(el => {
            container.removeChild(el)
        })
    }

    renderRoute(model) {
        const url = this.getUrl()
        const route = this.routes.find(el => el.path === url)

        this.clearPage()

        const page = new route.page(model)

        page.render()
    }


}

export default Router