import CalcPageComponent from "./pages/calc-page";
import HistoryPageComponent from "./pages/history-page";

import Router from "./router/router";

const appRoutes = [
    {path: '', page: CalcPageComponent},
    {path: 'history', page: HistoryPageComponent}
]

export const router = new Router(appRoutes)