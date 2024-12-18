import React, {ButtonHTMLAttributes, FC} from 'react';
import styled from "styled-components";

export const Button:FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return <ButtonStyled {...props} >{props.children}</ButtonStyled>
};

const ButtonStyled =styled.button`
    font-size: ${props => props.theme.fontSizes.big};
    color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.accent};
    border-radius: ${props => props.theme.spacings.middle};
    font-size: ${props => props.theme.fontSizes.big};
    font-weight: 700;
    padding: 0 20px;
    
    &:active{
        color: ${props => props.theme.colors.accent};
        background: ${props => props.theme.colors.primary};
    };
    &:disabled{
        color: ${props => props.theme.colors.primary};
        background: ${props => props.theme.colors.accent};
        cursor: not-allowed;
       opacity: 0.5;
    };
`;
