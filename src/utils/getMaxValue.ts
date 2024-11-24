import {valueFieldType} from "../components/counterSection/CounterSection";


export const getMaxValue = (valueFields:valueFieldType[],maxValueId:string) => {


    return  valueFields.find(f => f.id === maxValueId);

};