import {ChangeEvent, useLayoutEffect, useState} from "react";


export const useInput = (v:number) => {
    const [value, setValue] = useState(0);


    useLayoutEffect(() => {
        setValue(v);
    },[v])

    const onChangedValue = (e:ChangeEvent<HTMLInputElement>) =>
    {
        setValue(+e.currentTarget.value);
    };
return {value, onChangedValue};
};