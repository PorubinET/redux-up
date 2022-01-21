import { combineReducers } from "redux";

import { itemsReducer } from "../redux/itemsReducer";



// эта функция combineReducers объединяет 
// все редюсеры для компонентов


export const rootReducer = combineReducers({
    itemsReducer,
})