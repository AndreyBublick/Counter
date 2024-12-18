import React, {
    ChangeEvent,
    FC,
    InputHTMLAttributes,
    useEffect,
    useState
} from 'react';
import styled, {css} from "styled-components";
import {useInput} from "../../hooks/useInput";
import {TextField} from "@mui/material";


type PropsType = {
    isIncorrectValue: boolean,
    checkErrorValue: () => void,
    changeDisabledField: (id: string, isDisabled: boolean) => void,
    changeValueField: (id: string, value: number) => void,
    id: string,
    value: number,
    size?: "small" | "medium",

};


export const Input: FC<InputHTMLAttributes<HTMLInputElement> & PropsType> = ({
                                                                                 isIncorrectValue,
                                                                                 checkErrorValue,
                                                                                 changeDisabledField,
                                                                                 changeValueField,
                                                                                 id,
                                                                                 ...prev
                                                                             }) => {
    const {value, onChangedValue} = useInput(prev.value);
    const [isIncorrectValueInput, setIsIncorrectValue] = useState(false);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        /*props.getIsMinMoreMax();*/
        onChangedValue(e);
        checkErrorValue();
    };


    useEffect(() => {
        value < 0 ? setIsIncorrectValue(true) : setIsIncorrectValue(false);
    }, [value]);
    useEffect(() => {
        changeValueField(id, value as number);
    }, [value]);

    return<> <TextField  {...prev} color={'primary'} value={value as number} variant={'outlined'}
                         error={isIncorrectValue || isIncorrectValueInput} onChange={onChangeHandler} label="Number"  sx={{
        p: '0px 5px',

        width: '200px',
        '& .MuiInputBase-input': {
            fontSize: '16px', // Устанавливаем размер шрифта для текста в поле ввода
            textAlign: 'center',
            fontWeight: 700,
            padding: '0px 10px 0 15px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius:'inherit',
            color:(theme)=>theme.palette.primary.main,
            borderColor:'red',

        },
        'input[type=number]::-webkit-inner-spin-button': {
            marginLeft: '10px',
        },
        '& .MuiFormLabel-root': {
            fontSize: '17px', // Устанавливаем размер шрифта для метки
            margin: '0px 2px',
            fontWeight: 400,
        },
    }} slotProps={{
        inputLabel: {
            shrink: true,
        },
    }}/></>


    /*<TextField
        id="outlined-number"
        label="Number"
        type="number"
        slotProps={{
            inputLabel: {
                shrink: true,
            },
        }}/>*/
};


const InputStyled = styled(TextField)`/*<{ isIncorrectValue: boolean }>*/
        /* border-radius: 5px;
    border: 2px solid ${(props) => props.theme.colors.accent};
    text-align: center;*/
    /* padding: 0 5px;*/
    /*font-weight: 700;*/




`;
/*${props => props.isIncorrectValue && css<{ isIncorrectValue: boolean }>`
        border: 2px solid ${(props) => props.theme.colors.error};
        background: rgba(139, 0, 0, 0.6);
        color: white;
    `};*/
