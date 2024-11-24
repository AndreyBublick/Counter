import {valueFieldType} from "../components/counterSection/CounterSection";


export const getMinValue = (valueFields:valueFieldType[],minValueId:string) => {


    return  valueFields.find(f => f.id === minValueId);

};