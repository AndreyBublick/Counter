import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import {ActionCounter, counterReducer} from "./counter-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";


const rootReducer = combineReducers({
    counter:counterReducer,
})

// @ts-ignore
export const store = createStore(rootReducer,applyMiddleware(thunk));



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, ActionCounter>
export type AppStore = typeof store;

