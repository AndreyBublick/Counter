import React, {ChangeEvent, FC, InputHTMLAttributes, useEffect, useState} from 'react';
import {TextField} from "@mui/material";


type PropsType = {

    isIncorrectValue: boolean,
    checkErrorValue: () => void,
    onChangeValueField: (value: number) => void,
    value: number,


};


export const Input: FC<InputHTMLAttributes<HTMLInputElement> & PropsType> = ({
                                                                                 isIncorrectValue,
                                                                                 checkErrorValue,
                                                                                 onChangeValueField,
                                                                                 value,
                                                                                 size,
                                                                                 onChange,
                                                                                 ...prev
                                                                             }) => {
    const [isIncorrectValueInput, setIsIncorrectValue] = useState(false);


    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeValueField(Number(e.currentTarget.value));
        onChange?.(e);
        checkErrorValue();
    };


    useEffect(() => {
        value < 0 ? setIsIncorrectValue(true) : setIsIncorrectValue(false);
    }, [value]);

    return <> <TextField   {...prev} color={'primary'} value={value as number} variant={'outlined'}
                           error={isIncorrectValue || isIncorrectValueInput} onChange={onChangeHandler} label="Number"
                           sx={{
                               p: '0px 5px',
                               width: '200px',
                               '& .MuiInputBase-input': {
                                   fontSize: '16px', // Устанавливаем размер шрифта для текста в поле ввода
                                   textAlign: 'center',
                                   fontWeight: 700,
                                   padding: '0px 10px 0 15px',
                                   backgroundColor: 'rgba(255,255,255,0.1)',
                                   borderRadius: 'inherit',
                                   color: (theme) => theme.palette.primary.main,
                                   borderColor: 'red',

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


};

