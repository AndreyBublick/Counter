import React, {
    ChangeEvent,
    Dispatch,
    FC,
    InputHTMLAttributes,
    SetStateAction,
    useCallback,
    useEffect,
    useState
} from 'react';
import styled, {css} from "styled-components";
import {useInput} from "../../hooks/useInput";

type PropsType = {
   /* setIsIncorrectValue: Dispatch<SetStateAction<boolean>>,*/
    isIncorrectValue:boolean,

    changeDisabledField:(id:string,isDisabled:boolean) => void,
    changeValueField:(id:string,value:number) => void,
    id:string,
    value:number,

   /* isDisabled:boolean,*/
   /*getIsMinMoreMax:()=>void,*/

};


export const Input: FC<InputHTMLAttributes<HTMLInputElement> & PropsType> = (props) => {

    const {value, onChangedValue} = useInput(props.value);

    const [isIncorrectValueInput, setIsIncorrectValue] = useState(false);

  /*const changeDisabledFieldHandler =  useCallback(() => {

        if (value < 0) {
          /!*  setIsIncorrectValue(true);*!/
           props.changeDisabledField(props.id,true);

        } else {
            /!*setIsIncorrectValue(false);*!/
            props.changeDisabledField(props.id,false);


        }

    }, [value]);*/


    useEffect(() => {
        if (value < 0) {
              setIsIncorrectValue(true);
            /*props.changeDisabledField(props.id,true);*/

        } else {
            setIsIncorrectValue(false);
            /*props.changeDisabledField(props.id,false);*/


        }
    }, [value]);
const onChangeHandler = (e:ChangeEvent<HTMLInputElement>)=>{
  /*props.getIsMinMoreMax();*/
    onChangedValue(e);
};


    useEffect(() => {
        props.changeValueField(props.id,value as number);
    }, [value]);




   /* useEffect(()=>{
 props.getIsMinMoreMax();
    },[props.isIncorrectValue]);*/

    return <InputStyled {...props} value={value as number}
                        isIncorrectValue={props.isIncorrectValue ||isIncorrectValueInput}
                        onChange={ onChangeHandler}/>
};


const InputStyled = styled.input<{ isIncorrectValue: boolean }>`
    border-radius: 5px;

    border: 2px solid ${(props) => props.theme.colors.accent};
    text-align: center;
    padding: 0 5px;
    font-weight: 700;

    ${props => props.isIncorrectValue && css<{ isIncorrectValue: boolean }>`
        border: 2px solid ${(props) => props.theme.colors.error};
        background: rgba(139, 0, 0, 0.6);
        color: white;
    `};
`;

