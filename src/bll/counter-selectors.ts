import type {RootState} from "./store";

/*@ts-ignore*/
export const getMaxValueS = (state:RootState):number => state.counter.maxValue;

/*@ts-ignore*/
export const getCount = (state:RootState):number => state.counter.count;

/*@ts-ignore*/
export const getMinValueS = (state:RootState):number => state.counter.minValue;