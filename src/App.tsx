import React, {useState} from 'react';
import './App.css';
import styled from "styled-components";
import {CounterSection} from "./components/counterSection/CounterSection";
import {Container} from "./components/Container";


function App() {

    const [counter, setCounter] = useState(0);

    const increment = () => {
        setCounter(prev => prev + 1);
    };

    const setToLocalStorage = () => {
        localStorage.setItem('valueCount', JSON.stringify(counter));
    };
    const getFromLocalStorage = () => {
        /*setCounter();*/

        localStorage.getItem('valueCount') && setCounter(+(JSON.parse(localStorage.getItem('valueCount') as string)));


    };
    const clearLocalStorage = () => {
        localStorage.clear();
    };
    const removeItemLocalStorage = () => {
        localStorage.removeItem('valueCount');
    };

    return (
        <Wrapper>
            <Container>

                <CounterSection />
            </Container>

        </Wrapper>
    );
}


export default App;

const Wrapper = styled.div`
    padding: 100px 0;
    
    min-height: 100vh;
    background: ${props => props.theme.colors.primary};
`;

