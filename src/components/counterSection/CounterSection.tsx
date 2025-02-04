import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {Card} from "../card/Card";
import {v1} from "uuid";
import {getMinValue} from "../../utils/getMinValue";
import {getMaxValue} from "../../utils/getMaxValue";
import {CardBodyWithSettings} from "./cardBodyWithSettings/CardBodyWithSettings";
import {CardBodyOfDisplayCount} from "./cardBodyOfDisplayCount/CardBodyOfDisplayCount";
import {ButtonMui} from "../button/ButtonMUI";
import {SettingsInputComponent} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getCount} from "../../bll/counter-selectors";
import {useDispatch} from "react-redux";
import {fetchCounterTC, incrementTC, setValueCountTC} from "../../bll/counter-reducer";


const maxValueId = v1();
const minValueId = v1();

export type valueFieldType = {
    id: string,
    title: string,
    value: number,
};

type PropsType = {
    mode2:boolean,
};


export const CounterSection:FC<PropsType> = ({mode2}) => {
    /*const [counter, setCounter] = useState(0);*/

    const counter = useAppSelector(getCount);


const dispatch = useAppDispatch();



    const [valueFields, setValueFields] = useState([
        {id: maxValueId, title: 'max-value', value: 0},
        {id: minValueId, title: 'min-value', value: 0},

    ]);
    const [error, setError] = useState<string | null>(null);
    const [isMaximumValueAchieved, setIsMaximumValueAchieved] = useState<boolean>(false);
    const [isActiveSetButton, setIsActiveSetButton] = useState<boolean>(true);

    const [isOpenDisplayCard, setIsOpenDisplayCard] = useState(false);


    const min = useMemo(() => {
        return getMinValue(valueFields, minValueId);
    }, [valueFields]);
    const max = useMemo(() => {
        return getMaxValue(valueFields, maxValueId);
    }, [valueFields]);

    const isIncorrectValue = useMemo(() => {
    if(min && max){
        const minValue = min.value;
        const maxValue = max.value;
        if (maxValue < 0 && minValue < 0) {
            setError('Максимальное и минимальное не может быть отрицательным');
            return true;
        }
        else if (minValue < 0) {

            setError('Минимальное не может быть отрицательным');
            return true;
        }
        else if (maxValue < 0) {

            setError('Максимальное не может быть отрицательным');
            return true;
        }
        if (minValue > maxValue) {
            setError('Минимальное больше максимального');
            return true;
        }
        else if (minValue === maxValue) {
            setError('Минимальное равно максимальному');
            return true;
        }
        else {
            setError(null);
        }
    }
        return false;
    }, [valueFields]);


    const changeDisabledField = useCallback((idField: string, newValueDisabled: boolean) => {
        setValueFields(prev => prev.map(fieldData => fieldData.id === idField ? {
            ...fieldData,
            isDisabled: newValueDisabled
        } : fieldData));

    },[]);
    const changeValueField = useCallback((idField: string, newValue: number) => {
        setValueFields(prev => prev.map(fieldData => fieldData.id === idField ? {
            ...fieldData,
            value: newValue
        } : fieldData));

    },[]);
    const onClickIncrement = useCallback(() => {


        if (!(max && (counter === max.value))) {

           dispatch(incrementTC());

        }


    }, [counter, valueFields]);
    const onClickReset = useCallback(() => {

        const value: number = JSON.parse(localStorage.getItem('minValue') as string);

        /*value && setCounter(value) || value === 0 && setCounter(value);*/
                if(value||value===0){
                    console.log(value)
                  dispatch(setValueCountTC(value));   /*setCounter(value);*/
            }

        localStorage.setItem('valueCount', JSON.stringify(value));


    }, [counter]);
    const onClickSetButton = useCallback(() => {

        if(!mode2 || isOpenDisplayCard){

        (min) && dispatch(setValueCountTC(min.value)); /*setCounter(min.value);*/
}
        setIsActiveSetButton(true);


        min && localStorage.setItem('minValue', JSON.stringify(min.value));
        max && localStorage.setItem('maxValue', JSON.stringify(max.value));


        mode2 &&  setIsOpenDisplayCard(prev => !prev);

    }, [valueFields,isOpenDisplayCard]);
    const checkErrorValue = useCallback(() => {
        setIsActiveSetButton(false);
    }, [error]);



    useEffect(() => {

        (max && max.value === counter) ? setIsMaximumValueAchieved(true) :  setIsMaximumValueAchieved(false);


    }, [counter, valueFields]);
    useEffect(() => {


        ((min && max) && (min.value >= max.value)) && setValueFields(prev => prev.map(f => ({...f, isDisabled: true})));
    }, []);
    useEffect(() => {

        if (localStorage.getItem('valueCount') === localStorage.getItem('minValue')) {
            setIsActiveSetButton(true);
        }


    }, []);
    useEffect(() => {

        const minValue = JSON.parse(localStorage.getItem('minValue') as string);
        const maxValue = JSON.parse(localStorage.getItem('maxValue') as string);
       /* const valueCount = JSON.parse(localStorage.getItem('valueCount') as string);*///*777*/

        setValueFields(prev => prev.map(f => f.id === minValueId ? {...f, value: minValue} : f));
        setValueFields(prev => prev.map(f => f.id === maxValueId ? {...f, value: maxValue} : f));
        /*setCounter(valueCount);*/

            dispatch(fetchCounterTC());


    }, []);
    /*useEffect(() => {
        localStorage.setItem('valueCount', JSON.stringify(counter));

    }, [counter]);*/


    return <CounterSectionStyled>
        <Container>
            <FlexWrapper>

                {isOpenDisplayCard===mode2 && <Card>
                    <CardBodyWithSettings checkErrorValue={checkErrorValue} isIncorrectValue={isIncorrectValue} changeDisabledField={changeDisabledField}  changeValueField={changeValueField} onClickSetButton={onClickSetButton} isActiveSetButton={isActiveSetButton} valueFields={valueFields} />
                </Card>}

                {!isOpenDisplayCard &&  <Card>
                    <CardBodyOfDisplayCount isActiveSetButton={isActiveSetButton} isIncorrectValue={isIncorrectValue} counter={counter} error={error} isMaximumValueAchieved={isMaximumValueAchieved} onClickReset={onClickReset} onClickIncrement={onClickIncrement}>
                        {mode2 && <ButtonMui onClick={onClickSetButton} disabled={false}> <SettingsInputComponent /> </ButtonMui>}
                    </CardBodyOfDisplayCount>
                </Card>}
            </FlexWrapper>
        </Container>
    </CounterSectionStyled>
};


const Container = styled.div`



;

    text-align: center;
    max-width: 800px;
    margin: 0 auto;
`;
const FlexWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    gap: ${props => props.theme.spacings.middle};

    & > div {
        flex: 1;
        min-height: 350px;

    }
`;
const CounterSectionStyled = styled.section`

    input {
        height: 50px;

    }
`;

