import React, {useCallback, useEffect, useMemo, useState} from 'react';
import styled from "styled-components";
import {Card} from "../card/Card";
import {Button} from "../button/Button";
import {Input} from "../input/Input";
import {v1} from "uuid";


const maxValueId = v1();
const minValueId = v1();

export const CounterSection = () => {
    const [counter, setCounter] = useState(0);

    const [valueFields, setValueFields] = useState([
        {id: maxValueId,  title: 'max-value',value: 0},
        {id: minValueId,  title: 'min-value',value: 0}
    ]);
    const [error, setError] = useState<string|null>(null);




   const isIncorrectValue = useMemo(() => {

       /* const isDisabledField = valueFields.find(field => field.isDisabled);

        return isDisabledField ? isDisabledField.isDisabled : false;*/


       const max = valueFields.find(f=>f.id === maxValueId);
       const min = valueFields.find(f=>f.id === minValueId);



       let result = (min && max) &&  min.value >= max.value;


       if((min && max) &&  min.value > max.value){
           setError(result ? 'Минимальное больше максимального' :null);

       }
        if ((min && max) &&  min.value === max.value){
           setError(result ? 'Минимальное равно максимальному' :null);

       }
       console.log(min &&  min.value < 0)


       if(min && min.value < 0){
          result = true;
           setError(result ? 'Минимальное не может быть отрицательным' :null);

       }
        if(max && max.value < 0){
           result = true;
           setError(result ? 'Максимальное не может быть отрицательным' :null);

       }
        if((min && max) && (max.value < 0 && min.value<0)){
           result = true;
           setError(result ? 'Максимальное и минимальное не может быть отрицательным' :null);

       }
       return result;

    }, [valueFields]) as boolean;


 /*const getIsMinMoreMax = useCallback(() => {

       const max = valueFields.find(f=>f.id === maxValueId);
       const min = valueFields.find(f=>f.id === minValueId);






         ((min && max) && (min.value>=max.value) ) && setValueFields(prev=>prev.map(f=>({...f,isDisabled:true})));

    }, [valueFields]);*/

    useEffect(() => {
        const max = valueFields.find(f=>f.id === maxValueId);
        const min = valueFields.find(f=>f.id === minValueId);






        ((min && max) && (min.value>=max.value) ) && setValueFields(prev=>prev.map(f=>({...f,isDisabled:true})));
    }, []);

    const onClickIncrement = useCallback(() => {
        setCounter(prev=>prev+1);
        localStorage.setItem('valueCount',JSON.stringify(counter + 1));

    },[counter]);
    useEffect(() => {
        localStorage.getItem('valueCount') &&  setCounter(JSON.parse(localStorage.getItem('valueCount') as string));
    },[]);








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

    return <CounterSectionStyled>
        <Container>
            <FlexWrapper>
                <Card>
                    <InputsWrapper>
                        {valueFields.map(field => <InputWrapper  key={field.id}><span>{field.title}</span>
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

                        <Button disabled={isIncorrectValue} >set</Button>
                    </ButtonsWrapper>
                </Card>
                <Card>
                    <Counter>{(isIncorrectValue) ? (error && error): counter}</Counter>
                    <ButtonsWrapper>

                        <Button disabled={isIncorrectValue} onClick={onClickIncrement}>inc</Button>
                        <Button disabled={isIncorrectValue}>reset</Button>
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
const Counter = styled.span`
    flex: 1;
    border: 4px solid ${props => props.theme.colors.accent};
    border-radius: ${props => props.theme.spacings.middle};
    color: ${props => props.theme.colors.accent};
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes.big};
    display: flex;
    justify-content: center;
    align-items: center;
`;
