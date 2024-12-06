import {useEffect, useState} from "react";

export const useLoading = (time = 1000) => {

    const [isLoad, setIsLoad] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsLoad(true);
        }, time);
    }, []);
    return  {
        isLoad
    }
}