import React, {
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    useEffect,
    useState
} from 'react';
import styled, {css} from "styled-components";
import {useInput} from "../../hooks/useInput";

type PropsType = {
    isIncorrectValue:boolean,
    checkErrorValue:()=>void,
    changeDisabledField:(id:string,isDisabled:boolean) => void,
    changeValueField:(id:string,value:number) => void,
    id:string,
    value:number,

};


export const Input: FC<InputHTMLAttributes<HTMLInputElement> & PropsType> = (props) => {
    const {value, onChangedValue} = useInput(props.value);
    const [isIncorrectValueInput, setIsIncorrectValue] = useState(false);


    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
        /*props.getIsMinMoreMax();*/
        onChangedValue(e);
        props.checkErrorValue();
    };


    useEffect(() => {
        value < 0  ? setIsIncorrectValue(true) : setIsIncorrectValue(false);
    }, [value]);
    useEffect(() => {
        props.changeValueField(props.id,value as number);
    }, [value]);

    return <InputStyled {...props} value={value as number}
                        isIncorrectValue={props.isIncorrectValue || isIncorrectValueInput}
                        onChange={ onChangeHandler}/>
};


const InputStyled = styled.input<{ isIncorrectValue: boolean }>`
    border-radius: 5px;

    border: 2px solid ${(props) => props.theme.colors.accent};
    text-align: center;
    padding: 0 5px;
    font-weight: 700;

    ${props => props.isIncorrectValue && css<{ isIncorrectValue: boolean }>`
        border: 2px solid ${(props) => props.theme.colors.error};
        background: rgba(139, 0, 0, 0.6);
        color: white;
    `};
`;

