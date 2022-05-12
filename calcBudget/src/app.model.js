import Model from "./model/model";
import {load} from "./model/helpers";

const history = load('history')
history.map(el => {
    el.dateTime = new Date(el.dateTime)
})

export const model = new Model(history || undefined)