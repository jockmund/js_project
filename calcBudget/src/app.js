import App from './main'
import Router from "./router/router";

// В идеале переместить отсюда
const router = new Router([
    '/',
    '/history',
    '/settings'
])
//



new App({
    router
})