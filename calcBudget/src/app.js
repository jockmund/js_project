import App from './main'
import {model} from "./app.model";
import {router} from "./routes";


new App({
    router,
    model
})