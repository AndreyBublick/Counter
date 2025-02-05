import type {AppDispatch, RootState} from "./store";


const INCREMENT = 'INCREMENT';
const SET_VALUE_COUNT = 'SET_VALUE_COUNT';
const SET_MIN_VALUE_COUNT = 'SET_MIN_VALUE_COUNT';
const SET_MAX_VALUE_COUNT = 'SET_MAX_VALUE_COUNT';


const initialState = {
    count: 0,
    maxValue: 0,
    minValue: 0,

};

export const counterReducer = (state: InitialState = initialState, action: ActionCounter): InitialState => {
    switch (action.type) {
        case INCREMENT: {
            return {...state, count: state.count + 1};
        }
        case SET_VALUE_COUNT: {
            return {...state, count: action.count}
        }
        case SET_MIN_VALUE_COUNT: {
            return {...state, minValue: action.value}
        }
        case SET_MAX_VALUE_COUNT: {
            return {...state, maxValue: action.value}
        }
        default: {
            return state;
        }
    }
};
/*export const setCounterAC = (count: number) => ({type: SET_COUNT, count} as const);*/

export const incrementAC = () => ({type: INCREMENT} as const);



export const setValueCountAC = (count: number) => ({type: SET_VALUE_COUNT, count} as const);


export const setMaxValueAC = (value: number) => ({type: SET_MAX_VALUE_COUNT, value} as const);


export const setMinValueAC = (value: number) => ({type: SET_MIN_VALUE_COUNT, value} as const);


export const fetchCounterTC = () => async (dispatch: AppDispatch) => {
    try {
        const valueCount = await JSON.parse(localStorage.getItem('valueCount') as string);

        dispatch(setValueCountAC(valueCount));
    } catch (error) {
        alert(error);
    }
}
export const fetchMaxValueTC = () => async (dispatch: AppDispatch) => {
    try {
        const max = await JSON.parse(localStorage.getItem('maxValue') as string);

        dispatch(setMaxValueAC(max));
    } catch (error) {
        alert(error);
    }
}
export const fetchMinValueTC = () => async (dispatch: AppDispatch) => {
    try {
        const min = await JSON.parse(localStorage.getItem('minValue') as string);

        dispatch(setMinValueAC(min));
    } catch (error) {
        alert(error);
    }
}





export const incrementTC = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    try {

        /*@ts-ignore*/

        const currentCount = getState().counter.count as number;
        await localStorage.setItem('valueCount', JSON.stringify(currentCount + 1));
        dispatch(incrementAC());
    } catch (error) {
        alert(error);
    }
}
    export const setValueCountTC = (value: number) => async (dispatch: AppDispatch) => {
        try {

            await localStorage.setItem('valueCount', JSON.stringify(value));
            /*@ts-ignore*/
            dispatch(setValueCountAC(value));

        } catch (error) {
            alert(error);
        }
    }
    export const setMaxValueTC = (value: number) => async (dispatch: AppDispatch) => {
        try {

            await localStorage.setItem('maxValue', JSON.stringify(value));
            /*@ts-ignore*/
            dispatch(setMaxValueAC(value));

        } catch (error) {
            alert(error);
        }
    }
    export const setMinValueTC = (value: number) => async (dispatch: AppDispatch) => {
        try {

            await localStorage.setItem('minValue', JSON.stringify(value));
            /*@ts-ignore*/
            dispatch(setMinValueAC(value));

        } catch (error) {
            alert(error);
        }
    }


    type InitialState = typeof initialState;

    export type ActionCounter =
        | ReturnType<typeof incrementAC>
        | ReturnType<typeof setValueCountAC>
        | ReturnType<typeof setMaxValueAC>
        | ReturnType<typeof setMinValueAC>

