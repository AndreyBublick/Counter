
import type {AppDispatch, RootState} from "./store";


const INCREMENT = 'INCREMENT';
/*const DECREMENT = 'DECREMENT';*/
const SET_COUNT = 'SET_COUNT';
const SET_VALUE_COUNT = 'SET_VALUE_COUNT';

const initialState = {
    count: 0,

};

export const counterReducer = (state: InitialState = initialState, action: ActionCounter):InitialState => {
    switch (action.type) {
        case INCREMENT: {
            return {...state,count: state.count + 1};
        }
        /*case DECREMENT: {
            return state
        }*/
        case SET_COUNT: {
            return {...state, count:action.count}
        }
        case SET_VALUE_COUNT:{
            return {...state, count:action.count}
        }
        default: {
            return state;
        }
    }
};
export const setCounterAC = (count:number) => ({type: SET_COUNT,count} as const);

export const incrementAC = () => ({type: INCREMENT} as const);
/*export const decrementAC = () => ({type: DECREMENT} as const);*/



export const setValueCountAC = (count:number) => ({type: SET_VALUE_COUNT,count} as const);


export const fetchCounterTC = () => async (dispatch: AppDispatch) => {
    try {
        const valueCount = await JSON.parse(localStorage.getItem('valueCount') as string);

        dispatch(setCounterAC(valueCount));
    } catch (error) {
        alert(error);
    }
}


export const incrementTC = () => async (dispatch: AppDispatch,getState:()=>RootState) => {
    try {

        /*@ts-ignore*/

        const currentCount = getState().counter.count as number;
        await localStorage.setItem('valueCount', JSON.stringify( currentCount + 1));
       dispatch(incrementAC());
    } catch (error) {
        alert(error);
    }
}
export const setValueCountTC = (value:number) => async (dispatch: AppDispatch) => {
    try {

      await localStorage.setItem('valueCount', JSON.stringify(value));
        /*@ts-ignore*/
        dispatch(setValueCountAC(value));

    } catch (error) {
        alert(error);
    }
}


type InitialState = typeof initialState;

export type ActionCounter =
    | ReturnType<typeof setCounterAC>
    | ReturnType<typeof incrementAC>
    | ReturnType<typeof setValueCountAC>

    /*| ReturnType<typeof decrementAC>*/