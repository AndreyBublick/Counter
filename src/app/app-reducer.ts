import {Version} from "../common/enums";

const CHANGE_THEME_MODE = 'CHANGE_THEME_MODE';
const CHANGE_VERSION_COUNTER = 'CHANGE_VERSION_COUNTER';

const initialState = {
    themeMode: 'light' as Theme,
    versionCounter: Version.notChoice,
};

export const appReducer = (state: InitialState = initialState, action: ActionApp): InitialState => {
    switch (action.type) {


        case    CHANGE_THEME_MODE: {
            /*@ts-ignore*/
            return {...state,themeMode: action.payload.theme}
        }
        case    CHANGE_VERSION_COUNTER: {
            /*@ts-ignore*/
            return {...state,versionCounter: action.payload.version}
        }

        default: {
            return state;
        }
    }
}



export const changeThemeMode = (theme:Theme)=>({type: CHANGE_THEME_MODE,payload: {theme}});
export const changeVersionCounter = (version:Version)=>({type: CHANGE_VERSION_COUNTER,payload: {version}});
export type ActionApp =
    |ReturnType<typeof changeThemeMode>
    |ReturnType<typeof changeVersionCounter>;


type InitialState = typeof initialState
type Theme = 'light' | 'dark';



