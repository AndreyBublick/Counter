import React, {useState} from 'react';
import './App.css';
import styled from "styled-components";


function App() {

    const [counter, setCounter] = useState(0);
    console.log(counter)
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
                <div >{counter}</div>
                <div>
                    <button onClick={increment}>inc</button>
                    <button onClick={setToLocalStorage}>setToLocalStorage</button>
                    <button onClick={getFromLocalStorage}>getFromLocalStorage</button>
                    <button onClick={clearLocalStorage}>clearLocalStorage</button>
                    <button onClick={removeItemLocalStorage}>removeItemLocalStorage</button>

                </div>
            </Container>
        </Wrapper>
    );
}


export default App;

const InputStyled = styled.input`
    font-size: 20px;
    font-weight: 500;
    padding-left: 10px;
`;
const ButtonStyled = styled.button`
    font-size: 20px;
    font-weight: 500;
`;
const Wrapper = styled.div`
    padding: 100px 0;
    
    min-height: 100vh;
    background: rgba(255, 0, 39, 0.15);
`;
const Container = styled.div`
    font-size: 30px;
   & > div:first-child {
        margin-bottom: 20px;
    };
    
text-align: center;
max-width: 800px;
margin: 0 auto;
`;
