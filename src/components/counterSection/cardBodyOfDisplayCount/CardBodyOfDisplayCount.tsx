import React, {FC, useEffect, useState} from 'react';
import {Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {ButtonsWrapper} from "../../ButtonsWrapper";
import {Button} from "../../button/Button";
import styled, {css} from "styled-components";


type PropsType = {
    error:string|null,
    isMaximumValueAchieved:boolean,
    isActiveSetButton:boolean,
    counter:number,
    isIncorrectValue:boolean,

    onClickIncrement:()=>void,
    onClickReset:()=>void,
    children?: React.ReactNode,




};

export const CardBodyOfDisplayCount:FC<PropsType> = ({children,error,isMaximumValueAchieved,isActiveSetButton,isIncorrectValue,onClickIncrement,onClickReset,counter}) => {

    const [isLoad, setIsLoad] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setIsLoad(true);
        }, 1000);
    }, []);

    return <>

        {isLoad ? <Counter
            isError={isMaximumValueAchieved || !!error || !isActiveSetButton}>
            {(isIncorrectValue) ? (error && error) : isActiveSetButton ? counter : 'click set Button'}
        </Counter> : <Spin style={{color: "#05f7ff"}} indicator={<LoadingOutlined spin/>} size="large"/>}

        <ButtonsWrapper>

            <Button disabled={isIncorrectValue || isMaximumValueAchieved || !isActiveSetButton || !isLoad}
                    onClick={onClickIncrement}>inc</Button>
            <Button onClick={onClickReset}
                    disabled={isIncorrectValue || !isActiveSetButton || !isLoad}>reset</Button>
            {children}
        </ButtonsWrapper>

    </>
};

const Counter = styled.span<{ isError: boolean, color?: string }>`
    flex: 1;
    border: 4px solid ${props => props.theme.colors.accent};
    border-radius: ${props => props.theme.spacings.middle};
    color: ${props => props.theme.colors.accent};
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes.big};
    display: flex;
    justify-content: center;
    align-items: center;

    ${props => props.isError && css<{ isError: boolean, color?: string }>`
        color: red;
    `};
`;
