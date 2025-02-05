import React, {FC, useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {Card} from "../card/Card";
import {CardBodyWithSettings} from "./cardBodyWithSettings/CardBodyWithSettings";
import {CardBodyOfDisplayCount} from "./cardBodyOfDisplayCount/CardBodyOfDisplayCount";
import {ButtonMui} from "../button/ButtonMUI";
import {SettingsInputComponent} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {getCount, getMaxValueS, getMinValueS} from "../../bll/counter-selectors";
import {
    fetchCounterTC,
    fetchMaxValueTC,
    fetchMinValueTC,
    incrementTC,
    setValueCountTC
} from "../../bll/counter-reducer";


export type valueFieldType = {
    id: string,
    title: string,
    value: number,
};

type PropsType = {
    mode2:boolean,
};


export const CounterSection:FC<PropsType> = ({mode2}) => {

    const counter = useAppSelector(getCount);
    const maxValue = useAppSelector(getMaxValueS);
    const minValue = useAppSelector(getMinValueS);


    const dispatch = useAppDispatch();


    const [error, setError] = useState<string | null>(null);
    const [isMaximumValueAchieved, setIsMaximumValueAchieved] = useState<boolean>(false);
    const [isActiveSetButton, setIsActiveSetButton] = useState<boolean>(true);

    const [isOpenDisplayCard, setIsOpenDisplayCard] = useState(false);



    const isIncorrectValue = useMemo(() => {

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
        return false;
    }, [maxValue,minValue]);


    const onClickIncrement = useCallback(() => {


        if (counter !== maxValue) {

           dispatch(incrementTC());

        }


    }, [counter,maxValue]);
    const onClickReset = useCallback(() => {
                dispatch(setValueCountTC(minValue));

    }, [counter,minValue]);
    const onClickSetButton = useCallback(() => {

        if(!mode2 || isOpenDisplayCard){
         dispatch(setValueCountTC(minValue));
}
        setIsActiveSetButton(true);




        mode2 &&  setIsOpenDisplayCard(prev => !prev);

    }, [isOpenDisplayCard,minValue,mode2]);
    const checkErrorValue = useCallback(() => {
        setIsActiveSetButton(false);
    }, []);



    useEffect(() => {

         maxValue === counter ? setIsMaximumValueAchieved(true) :  setIsMaximumValueAchieved(false);


    }, [counter]);

    useEffect(() => {


            dispatch(fetchCounterTC());
            dispatch(fetchMaxValueTC());
            dispatch(fetchMinValueTC());


    }, []);



    return <CounterSectionStyled>
        <Container>
            <FlexWrapper>

                {isOpenDisplayCard===mode2 && <Card>
                    <CardBodyWithSettings
                        checkErrorValue={checkErrorValue}
                        isIncorrectValue={isIncorrectValue}
                        onClickSetButton={onClickSetButton} isActiveSetButton={isActiveSetButton}  />
                </Card>}

                {!isOpenDisplayCard &&  <Card>
                    <CardBodyOfDisplayCount isActiveSetButton={isActiveSetButton} isIncorrectValue={isIncorrectValue} counter={counter} error={error} isMaximumValueAchieved={isMaximumValueAchieved} onClickReset={onClickReset} onClickIncrement={onClickIncrement}>
                        {mode2 && <ButtonMui onClick={onClickSetButton} disabled={false}> <SettingsInputComponent />
                        </ButtonMui>}
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

