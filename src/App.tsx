import React, {useCallback, useState} from 'react';
import './App.css';
import styled from "styled-components";
import {CounterSection} from "./components/counterSection/CounterSection";
import {Container} from "./components/Container";
import {ButtonsWrapper} from "./components/ButtonsWrapper";
import {ButtonMui} from "./components/button/ButtonMUI";
import {AppBar, Box, createTheme, CssBaseline, ThemeProvider, Toolbar, Typography} from "@mui/material";
import {DarkLightSwitcher} from "./components/switches/darkLight/DarkLightSwitch";
import {Wrapper} from "./components/Wrapper";
import {Version} from "./common/enums";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import {getThemeMode, getVersionCounter} from "./bll/app-selectors";
import {changeThemeMode, changeVersionCounter} from "./app/app-reducer";


function App() {

    /*const [choice, setChoice] = useState<Version>(Version.notChoice);*/
    const [isOpenCounter, setIsOpenCounter] = useState(false);
    /*const [themeMode, setThemeMode] = useState<PaletteMode>('light');*/
        const version = useAppSelector(getVersionCounter);
        const themeMode = useAppSelector(getThemeMode);
        const dispatch = useAppDispatch();





    const changeFirstVersion = useCallback(() => {

        dispatch(changeVersionCounter(Version.v1));
        setIsOpenCounter(true);
    },[dispatch]);

    const changeSecondVersion = useCallback(() => {
        dispatch(changeVersionCounter(Version.v2));
        setIsOpenCounter(true);
    },[dispatch]);



    const changeTheme = useCallback(() => {
        dispatch(changeThemeMode(themeMode==='light' ? 'dark' :'light'));


    },[themeMode,dispatch]);

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
                        <DarkLightSwitcher onClick={changeTheme} />
                    </Box>
                </Toolbar>
            </AppBar>
        <Wrapper>
            <Container>
                {!isOpenCounter && <> <Title>Choose a version of counter</Title>
                    <ButtonsWrapper>
                        <ButtonMui onClick={changeFirstVersion}>#1</ButtonMui>
                        <ButtonMui onClick={changeSecondVersion}>#2</ButtonMui>
                    </ButtonsWrapper></>}
                {isOpenCounter && <CounterSection mode2={version === Version.v1}/>}

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





