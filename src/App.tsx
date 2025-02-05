import React, {useCallback, useState} from 'react';
import './App.css';
import styled from "styled-components";
import {CounterSection} from "./components/counterSection/CounterSection";
import {Container} from "./components/Container";
import {ButtonsWrapper} from "./components/ButtonsWrapper";
import {
    AppBar,
    Box,
    createTheme,
    CssBaseline,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
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


    const changeVersion = useCallback((ver: Version) => {


        if (ver === Version.notChoice) {
            setIsOpenCounter(false);
        }
        else{
            setIsOpenCounter(true);

        }
        dispatch(changeVersionCounter(ver));

    }, [dispatch]);


    const changeTheme = useCallback(() => {
        dispatch(changeThemeMode(themeMode === 'light' ? 'dark' : 'light'));


    }, [themeMode, dispatch]);

    const theme = createTheme({

        palette: {
            mode: themeMode,
            primary: {
                main: '#05f7ff',
                light: '#023e49',


            },
            secondary: {
                main: '#15205c',
            },


        },
    });
    return <AppStyled>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AppBar component="nav">
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>

                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 0, display: {xs: 'none', sm: 'block'}}}
                    >
                        Counter
                    </Typography>
                    <FormControl color={theme.palette.mode === 'dark' ? 'primary' : 'secondary'} size={'small'}
                                 sx={{width: 'auto'}}>
                        {!isOpenCounter && <InputLabel sx={{position: 'absolute', top: -4, left: -4}}
                                                       id="version">Version</InputLabel>}
                        <Select
                            labelId="version"

                            value={version}

                            onChange={(e: SelectChangeEvent<Version>) => {
                                changeVersion(e.target.value as Version)
                            }}
                        >
                            <MenuItem value={Version.notChoice}>Default</MenuItem>
                            <MenuItem value={Version.v1}>v1</MenuItem>
                            <MenuItem value={Version.v2}>v2</MenuItem>
                        </Select>
                    </FormControl>

                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        <DarkLightSwitcher onClick={changeTheme}/>
                    </Box>
                </Toolbar>
            </AppBar>
            <Wrapper>
                <Container>
                    {!isOpenCounter && <>
                        <Title>Choose a version of counter</Title>

                    </>
                    }
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


/*<ButtonsWrapper>
        <ButtonMui onClick={changeFirstVersion}>#1</ButtonMui>
        <ButtonMui onClick={changeSecondVersion}>#2</ButtonMui>
    </ButtonsWrapper></>*/
