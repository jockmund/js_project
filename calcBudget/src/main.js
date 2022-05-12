import {EventEmitter} from "./model/helpers";

export default class App extends EventEmitter {
    /**
     * Создается объект StartApp, который запускает приложение с аргументами arg
     *
     * @param {Object} options - Дополнительные опции, пр. model, router
     * @this {App}
     */
    constructor(options) {
        super()

        this.router = options.router
        this.model = options.model

        document.addEventListener('readystatechange', this.start.bind(this))

        window.addEventListener('hashchange', this.changePage.bind(this))
    }

    changePage() {
        this.router.renderRoute(this.model)
    }

    start() {
        /**
         * Производится проверка на каком URL пользователь сейчас находится. Запускает функцию с инициализацией модели,
         * и разных view и controller в зависимости от текущего URL страницы.
         */
        if (document.readyState !== "complete")
            return

        this.router.renderRoute(this.model)
    }
}