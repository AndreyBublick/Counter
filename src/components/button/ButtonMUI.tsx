import React, {ButtonHTMLAttributes, FC, HTMLAttributes, ReactNode} from 'react';
import {Button} from "@mui/material";
import styled from "styled-components";





export const ButtonMui:FC<ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return <Button  {...props} variant="contained"   color={'primary'} sx={{p: '10px 30px',fontSize:'16px'}}>{props.children}</Button>
};




