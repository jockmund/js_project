import Model from "./model/model";

import ViewMainPage from "./views/viewMainPage";
import ContMainPage from "./controllers/contMainPage";

import ViewHistoryPage from "./views/viewHistoryPage";
import ContHistoryPage from "./controllers/contHistoryPage";

import {EventEmitter, load, save, cutURL} from "./model/helpers";

export default class App extends EventEmitter {
    /**
     * Создается объект StartApp, который запускает приложение с аргументами arg
     *
     * @param {Object} args - Дополнительные объекты, (типа router)
     * @this {App}
     */
    constructor(args) {
        super()

        this.router = args.router

        const history = load('history')
        history.map(el => {
            el.dateTime = new Date(el.dateTime)
        })


        this.view = undefined
        this.controller = undefined
        this.model = new Model(history || undefined)

        this.URL = ''

        document.addEventListener('readystatechange', this.start.bind(this))

        this.addEventListenerOnTagA()

    }

    start(event) {
        /**
         * Производится проверка на каком URL пользователь сейчас находится. Запускает функцию с инициализацией модели,
         * и разных view и controller в зависимости от текущего URL страницы.
         */
        if (document.readyState !== "complete")
            return

        this.model.on('save', save)
        this.model.on('load', load)

        const url = event.target.URL
        const pageName = cutURL(url)

        this.URL = new URL(url)

        this.changePage(pageName)
    }

    addEventListenerOnTagA() {
        const tagsA = document.querySelectorAll('a')
        tagsA.forEach(el => {
            el.addEventListener('click', this.deleteDefaultReactionFromTagA.bind(this))
        })
    }

    deleteDefaultReactionFromTagA(event) {
        event.preventDefault()

        this.URL.pathname = event.target.pathname
        window.history.replaceState({}, "", this.URL.toString())

        const container = document.getElementById('app')

        const listNodes = []

        for (const node of container.childNodes) {
            listNodes.push(node)
        }

        listNodes.forEach(node => container.removeChild(node))

        this.changePage(this.URL.pathname)
    }

    // deletePageObjects() {
    //     delete this.view
    //     delete this.controller
    // }

    changePage(pageName) {
        // this.deletePageObjects()

        switch (pageName) {
            case '/':
                // Компонент Калькулятора
                this.view = new ViewMainPage()
                this.controller = new ContMainPage(this.model, this.view)
                break
            case '/history':
                // Компонент истории
                this.view = new ViewHistoryPage()
                this.controller = new ContHistoryPage(this.model, this.view)
                break

        }
    }
}