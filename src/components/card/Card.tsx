import React, {FC, ReactNode} from 'react';
import styled from "styled-components";

type PropsType = {
    children: ReactNode;
};

export const Card: FC<PropsType> = ({children}) => {
    return <CardStyled>
        {children}
    </CardStyled>
};

const CardStyled = styled.div`
    max-width: 400px;
    border-radius: 0.5rem;
    padding: ${props => props.theme.spacings.middle};
    border: 4px solid ${(props) => props.theme.colors.accent};
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.spacings.big};

    & > div {
        border-radius: 0.5rem;
        border: 4px solid ${(props) => props.theme.colors.accent};
        padding: 20px 10px;
        
    }
    &>div:first-child {
        flex: 1;
        display: flex;
        gap: ${props => props.theme.spacings.big};
        align-items: center;
        justify-content: center;
    };

`;

