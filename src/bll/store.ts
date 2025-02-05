import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ActionCounter, counterReducer} from "./counter-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {ActionApp, appReducer} from "../app/app-reducer";


const rootReducer = combineReducers({
    counter:counterReducer,
    app:appReducer,
})

// @ts-ignore
export const store = createStore(rootReducer,applyMiddleware(thunk));



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionCounter|ActionApp>
export type AppStore = typeof store;

