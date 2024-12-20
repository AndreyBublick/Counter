import {styled} from "@mui/material/styles";
import {Box} from "@mui/material";
import {ButtonsWrapper} from "./ButtonsWrapper";
import {Container} from "./Container";

export const Wrapper = styled(Box)( ({theme})=> ({


    padding: '100px 0',
    minHeight: '100vh',

    backgroundColor:`${theme.palette.mode === 'light' ? theme.palette.primary.light : '#333'}`,



}));
/*rgb(59,89,97)*/