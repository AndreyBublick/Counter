import React, {useCallback, useState} from 'react';
import './App.css';
import styled from "styled-components";
import {CounterSection} from "./components/counterSection/CounterSection";
import {Container} from "./components/Container";
import {Button} from "./components/button/Button";
import {ButtonsWrapper} from "./components/ButtonsWrapper";



function App() {

    const [choice,setChoice] = useState<null|'v1'>(null);
    const [isOpenCounter, setIsOpenCounter] = useState(false);

const onClickHandler = useCallback(()=>{
    setIsOpenCounter(true);
},[]);

    return (
        <Wrapper>
            <Container>
                {!isOpenCounter &&<> <Title>Choose a version of counter</Title>
                <ButtonsWrapper>
                <Button onClick={()=>{setChoice(null);onClickHandler()}}>#1</Button>
                <Button onClick={()=>{setChoice('v1');onClickHandler()}}>#2</Button>
                </ButtonsWrapper></>}
                {isOpenCounter && <CounterSection mode2={choice==='v1'} />}

            </Container>
        </Wrapper>
    );
}

export default App;

const Wrapper = styled.div`
    padding: 100px 0;
    min-height: 100vh;
    background: ${props => props.theme.colors.primary};

    ${Container} > ${ButtonsWrapper} {
        max-width: 400px;
        margin: 0 auto;
    }
    ${Container} > ${ButtonsWrapper} > button {
        padding: 0 40px;
        line-height: 2;
    }
        
    }
`;


const Title = styled.h1`
    color: ${props => props.theme.colors.accent};
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes.big};
    margin-bottom: ${props => props.theme.spacings.big};
`;



