import type {RootState} from "./store";

/*@ts-ignore*/
export const getThemeMode = (state:RootState)=>state.app.themeMode;
/*@ts-ignore*/
export const getVersionCounter = (state:RootState)=>state.app.versionCounter;