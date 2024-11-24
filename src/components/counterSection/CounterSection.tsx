import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled, {css} from "styled-components";
import {Card} from "../card/Card";
import {Button} from "../button/Button";
import {Input} from "../input/Input";
import {v1} from "uuid";


const maxValueId = v1();
const minValueId = v1();

export const CounterSection = () => {
    const [counter, setCounter] = useState(0);

    const [valueFields, setValueFields] = useState([
        {id: maxValueId, title: 'max-value', value: 0},
        {id: minValueId, title: 'min-value', value: 0}
    ]);
    const [error, setError] = useState<string | null>(null);
    const [isMaximumValueAchieved, setIsMaximumValueAchieved] = useState<boolean>(false);

    const [isActiveSetButton, setIsActiveSetButton] = useState<boolean>(false);




    const isIncorrectValue = useMemo(() => {

        /* const isDisabledField = valueFields.find(field => field.isDisabled);

         return isDisabledField ? isDisabledField.isDisabled : false;*/


        const max = valueFields.find(f => f.id === maxValueId);
        const min = valueFields.find(f => f.id === minValueId);


        let result = (min && max) && min.value >= max.value;


        if ((min && max) && min.value > max.value) {

            setError('Минимальное больше максимального');


        }
        else if((min && max) && min.value === max.value){
            /*  setError(result ? 'Минимальное равно максимальному' :null);*/
            setError('Минимальное равно максимальному');
        }
        else {

            setError(null);

        }





        if ((min && max) && (max.value < 0 && min.value < 0)) {
            result = true;
            setError(result ? 'Максимальное и минимальное не может быть отрицательным' : null);

        } else if (min && min.value < 0) {
            result = true;
            setError(result ? 'Минимальное не может быть отрицательным' : null);

        } else if (max && max.value < 0) {
            result = true;
            setError(result ? 'Максимальное не может быть отрицательным' : null);

        }

        return result;

    }, [valueFields]) as boolean;


    /*const getIsMinMoreMax = useCallback(() => {

          const max = valueFields.find(f=>f.id === maxValueId);
          const min = valueFields.find(f=>f.id === minValueId);






            ((min && max) && (min.value>=max.value) ) && setValueFields(prev=>prev.map(f=>({...f,isDisabled:true})));

       }, [valueFields]);*/


    const changeDisabledField = (idField: string, newValueDisabled: boolean) => {
        setValueFields(prev => prev.map(fieldData => fieldData.id === idField ? {
            ...fieldData,
            isDisabled: newValueDisabled
        } : fieldData));

    };
    const changeValueField = (idField: string, newValue: number) => {
        setValueFields(prev => prev.map(fieldData => fieldData.id === idField ? {
            ...fieldData,
            value: newValue
        } : fieldData));

    };
    const onClickIncrement = useCallback(() => {
        const max = valueFields.find(f => f.id === maxValueId);


        if (!(max && (counter === max.value))) {

            setCounter(prev => prev + 1);
            localStorage.setItem('valueCount', JSON.stringify(counter + 1));

        }


    }, [counter, valueFields]);
    const onClickReset = useCallback(() => {

        const value:number = JSON.parse(localStorage.getItem('minValue') as string );

        value &&  setCounter(value);

        localStorage.setItem('valueCount', JSON.stringify(value));


    }, [counter]);

    const onClickSetButton = useCallback(()=>{

        const min = valueFields.find(f => f.id === minValueId);
        const max = valueFields.find(f => f.id === maxValueId);

        const value:number = JSON.parse(localStorage.getItem('minValue') as string );
        localStorage.setItem('valueCount', JSON.stringify(value));

        (min) && setCounter(min.value);

        setIsActiveSetButton(true);


        min && localStorage.setItem('minValue', JSON.stringify(min.value));
        max && localStorage.setItem('maxValue', JSON.stringify(max.value));

    },[valueFields]);


    useEffect(() => {

        const max = valueFields.find(f => f.id === maxValueId);

        if (max && max.value === counter) {
            setIsMaximumValueAchieved(true);
        } else {
            setIsMaximumValueAchieved(false);
        }

    }, [counter, valueFields]);



    useEffect(() => {
        const max = valueFields.find(f => f.id === maxValueId);
        const min = valueFields.find(f => f.id === minValueId);


        ((min && max) && (min.value >= max.value)) && setValueFields(prev => prev.map(f => ({...f, isDisabled: true})));
    }, []);
    useEffect(() => {

        if(  localStorage.getItem('valueCount')===localStorage.getItem('minValue')){
            setIsActiveSetButton(true);
        }
        else{
            error ? setIsActiveSetButton(true) : setIsActiveSetButton(false);
        }

    }, [valueFields, error]);



    /*useEffect(() => {
        localStorage.getItem('valueCount') && setCounter(JSON.parse(localStorage.getItem('valueCount') as string));
    }, []);*/
   /* useEffect(() => {
        localStorage.setItem('valueCount', JSON.stringify(counter));
    }, [counter]);*/

    useEffect(() => {

        const minValue = JSON.parse(localStorage.getItem('minValue') as string);
        const maxValue = JSON.parse(localStorage.getItem('maxValue') as string);
        const valueCount = JSON.parse(localStorage.getItem('valueCount') as string);

       setValueFields(prev=>prev.map(f=>f.id===minValueId ? {...f,value: minValue} : f));
        setValueFields(prev=>prev.map(f=>f.id===maxValueId ? {...f,value: maxValue} : f));
        setCounter(valueCount);
    }, []);


   /* useEffect(() => {
        const min = valueFields.find(f => f.id === minValueId);

        min && localStorage.setItem('minValue', JSON.stringify(min.value));
    }, [valueFields]);
    useEffect(() => {
        const max = valueFields.find(f => f.id === maxValueId);

        max && localStorage.setItem('maxValue', JSON.stringify(max.value));
    }, [valueFields]);*/
    return <CounterSectionStyled>
        <Container>
            <FlexWrapper>
                <Card>
                    <InputsWrapper>
                        {valueFields.map(field => <InputWrapper key={field.id}><span>{field.title}</span>
                            <Input
                                changeDisabledField={changeDisabledField}
                                changeValueField={changeValueField}
                                /*getIsMinMoreMax={getIsMinMoreMax}*/
                                isIncorrectValue={isIncorrectValue}
                                id={field.id}
                                type="number"
                                value={field.value}
                                /*  isIncorrectValue={isIncorrectValue}
                                  isDisabled={field.isDisabled}*/
                            />
                        </InputWrapper>)}


                    </InputsWrapper>

                    <ButtonsWrapper>

                        <Button onClick={onClickSetButton} disabled={isIncorrectValue || isActiveSetButton}>set</Button>
                    </ButtonsWrapper>
                </Card>
                <Card>
                    <Counter
                        isMaximumValueAchieved={isMaximumValueAchieved&&!error}>{(isIncorrectValue) ? (error && error) : counter}</Counter>
                    <ButtonsWrapper>

                        <Button disabled={isIncorrectValue || isMaximumValueAchieved}
                                onClick={onClickIncrement}>inc</Button>
                        <Button onClick={onClickReset} disabled={isIncorrectValue}>reset</Button>
                    </ButtonsWrapper>
                </Card>
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

    }
`;

const ButtonsWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const InputsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacings.big};

`;

const InputWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    span {
        font-size: ${props => props.theme.fontSizes.middle};
        font-weight: 700;
        color: ${props => props.theme.colors.accent};
    }
`;
const CounterSectionStyled = styled.section`

    input {
        height: 50px;

    }
`;
const Counter = styled.span<{ isMaximumValueAchieved: boolean }>`
    flex: 1;
    border: 4px solid ${props => props.theme.colors.accent};
    border-radius: ${props => props.theme.spacings.middle};
    color: ${props => props.theme.colors.accent};
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes.big};
    display: flex;
    justify-content: center;
    align-items: center;

    ${props => props.isMaximumValueAchieved && css<{ isMaximumValueAchieved: boolean }>`
        color: red;
    `};
`;
