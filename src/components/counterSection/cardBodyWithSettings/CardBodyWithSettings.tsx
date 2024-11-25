import React, {FC, useEffect, useState} from 'react';
import {Input} from "../../input/Input";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {Button} from "../../button/Button";
import {valueFieldType} from "../CounterSection";
import {ButtonsWrapper} from "../../ButtonsWrapper";
import {InputsWrapper} from "../../InputsWrapper";
import {InputWrapper} from "../../InputWrapper";


type PropsType = {
    valueFields: valueFieldType[],
    isActiveSetButton: boolean,
    isIncorrectValue: boolean,

    changeDisabledField: (idField: string, newValueDisabled: boolean) => void,
    changeValueField: (idField: string, newValue: number) => void,
    checkErrorValue: () => void,
    onClickSetButton: () => void,

};

export const CardBodyWithSettings: FC<PropsType> = ({valueFields,changeDisabledField, changeValueField, checkErrorValue, isIncorrectValue, onClickSetButton, isActiveSetButton}) => {
    const [isLoad, setIsLoad] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsLoad(true);
        }, 1000);
    }, []);

    return <>
        {isLoad ?
            <InputsWrapper>{valueFields.map(field => <InputWrapper key={field.id}><label>{field.title}</label>
                <Input
                    changeDisabledField={changeDisabledField}
                    changeValueField={changeValueField}
                    checkErrorValue={checkErrorValue}
                    isIncorrectValue={isIncorrectValue}
                    id={field.id}
                    type="number"
                    value={field.value}
                />
            </InputWrapper>)}
            </InputsWrapper> :
            <Spin style={{color: "#05f7ff"}} indicator={<LoadingOutlined spin/>} size="large"/>}

        <ButtonsWrapper>
            <Button onClick={onClickSetButton} disabled={isIncorrectValue || isActiveSetButton}>set</Button>
        </ButtonsWrapper>
    </>;
};





