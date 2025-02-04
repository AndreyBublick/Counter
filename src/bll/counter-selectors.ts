import type {RootState} from "./store";

/*@ts-ignore*/
export const getCount = (state:RootState):number => state.counter.count;