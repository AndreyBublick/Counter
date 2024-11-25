import styled from "styled-components";

export const InputWrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: ${props => props.theme.spacings.big};


    label {
        font-size: ${props => props.theme.fontSizes.middle};
        font-weight: 700;
        color: ${props => props.theme.colors.accent};
    }
`;