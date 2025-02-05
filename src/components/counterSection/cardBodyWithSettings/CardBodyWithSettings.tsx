import React, {FC, useCallback} from 'react';
import {Input} from "../../input/Input";
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {ButtonsWrapper} from "../../ButtonsWrapper";
import {InputsWrapper} from "../../InputsWrapper";
import {InputWrapper} from "../../InputWrapper";
import {useLoading} from "../../../hooks/useLoading";
import {ButtonMui} from "../../button/ButtonMUI";
import {SettingsInputComponent} from "@mui/icons-material";
import {useAppDispatch, useAppSelector} from "../../../hooks/hooks";
import {getMaxValueS, getMinValueS} from "../../../bll/counter-selectors";
import {setMaxValueTC, setMinValueTC} from "../../../bll/counter-reducer";


type PropsType = {
    isActiveSetButton: boolean,
    isIncorrectValue: boolean,

    checkErrorValue: () => void,
    onClickSetButton: () => void,

};

export const CardBodyWithSettings: FC<PropsType> = ({ checkErrorValue, isIncorrectValue, onClickSetButton, isActiveSetButton}) => {

    const {isLoad} = useLoading();
    const maxValue = useAppSelector(getMaxValueS);
    const minValue = useAppSelector(getMinValueS);

   const  dispatch = useAppDispatch();

   const setMaxValue = useCallback((value:number)=>{
       dispatch(setMaxValueTC(value));
   },[]);
    const setMinValue = useCallback((value:number)=>{
        dispatch(setMinValueTC(value));
    },[]);

    return <>
        {isLoad ?
            <InputsWrapper>
                <InputWrapper >
                <label>max-value</label>
                    <Input
                        onChangeValueField={setMaxValue}
                        checkErrorValue={checkErrorValue}
                        isIncorrectValue={isIncorrectValue}

                        type="number"
                        value={maxValue}
                    />

                </InputWrapper>
                <InputWrapper >
                    <label>min-value</label>
                    <Input
                        onChangeValueField={setMinValue}
                        checkErrorValue={checkErrorValue}
                        isIncorrectValue={isIncorrectValue}

                        type="number"
                        value={minValue}
                    />

                </InputWrapper>
            </InputsWrapper> :
            <Spin style={{color: "#05f7ff"}} indicator={<LoadingOutlined spin/>} size="large"/>}

        <ButtonsWrapper>
            <ButtonMui onClick={onClickSetButton} disabled={isIncorrectValue || isActiveSetButton}>
                <SettingsInputComponent />
            </ButtonMui>
        </ButtonsWrapper>
    </>;
};





