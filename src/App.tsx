import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import styled from "styled-components";
import {CounterSection} from "./components/counterSection/CounterSection";
import {Container} from "./components/Container";
import {ButtonsWrapper} from "./components/ButtonsWrapper";
import {ButtonMui} from "./components/button/ButtonMUI";
import {
    AppBar,
    createTheme,
    CssBaseline,
    IconButton,
    ThemeProvider,
    Toolbar,
    Typography,
    Box,
    Switch, PaletteMode, Theme
} from "@mui/material";
import {DarkLightSwitcher} from "./components/switches/darkLight/DarkLightSwitch";
import {Wrapper} from "./components/Wrapper";


type VariantsType = null | 'v1' | 'v2';

function App() {

    const [choice, setChoice] = useState<VariantsType>(null);
    const [isOpenCounter, setIsOpenCounter] = useState(false);
    const [themeMode, setThemeMode] = useState<PaletteMode>('light');
    const onClickHandler = useCallback(() => {
        setIsOpenCounter(true);
    }, []);

    useEffect(() => {

        let  result = sessionStorage.getItem('variant');

        /*as VariantsType*/

        if(result!=='null' && result!==null){
           setChoice(result as VariantsType);
           onClickHandler();
       }

    }, []);

    const onClickPickVariantNumber1Handler = () => {
        setChoice('v1');
        sessionStorage.setItem('variant', 'v1');
        onClickHandler();
    };
    const onClickPickVariantNumber2Handler = () => {
        setChoice('v2');
        sessionStorage.setItem('variant', 'v2');
        onClickHandler();
    };


     const theme = createTheme({

        palette: {
            mode:themeMode,
            primary: {
                main: '#05f7ff',
               /* dark: 'red',*/
                light: 'rgb(59,89,97)',
            },
            secondary: {
                main: '#640db3',
            },
        },
    });
    return <AppStyled>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        Counter
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <DarkLightSwitcher onClick={()=>{setThemeMode(prev=> prev==='light' ? 'dark' :'light')}} />
                    </Box>
                </Toolbar>
            </AppBar>
        <Wrapper>
            <Container>
                {!isOpenCounter && <> <Title>Choose a version of counter</Title>
                    <ButtonsWrapper>
                        <ButtonMui onClick={onClickPickVariantNumber1Handler}>#1</ButtonMui>
                        <ButtonMui onClick={onClickPickVariantNumber2Handler}>#2</ButtonMui>
                    </ButtonsWrapper></>}
                {isOpenCounter && <CounterSection mode2={choice === 'v1'}/>}

            </Container>
        </Wrapper>
        </ThemeProvider>
    </AppStyled>;
}

export default App;

const AppStyled = styled.div`

    ${Container} > ${ButtonsWrapper} {
        max-width: 400px;
        margin: 0 auto;
    }
    
}
`;


const Title = styled.h1`
    color: ${props => props.theme.colors.accent};
    font-weight: 700;
    font-size: ${props => props.theme.fontSizes.big};
    margin-bottom: ${props => props.theme.spacings.big};
`;





