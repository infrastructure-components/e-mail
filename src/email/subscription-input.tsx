import React, { useState } from 'react';

import styled from 'styled-components';
//import { callSubscriptionService } from './subscription-service';



const InputFrame = styled.span`
    display:inline-table;
    position: relative;
    width: ${props => props.width};
    margin: 12px 4px;
    padding: 10px;
    border: 2px solid black;
    border-radius: 8px;;
`;


const Label = styled.label`
    position:absolute;
    top:-8px;
    left:16px;
    background-color: white;
    padding: 0 3px;
    display:table-cell;
    font-size: 1em;
`;


const Input = styled.input`
    display:table-cell;
    border: 0;
    outline: 0;
    background: transparent;
    
    border-bottom: 1px solid black;
    width: calc(100% - 70px);
    margin: 8px 8px 0px 8px;
    color: ${props => !props.error ? "#000" : "#F00"};
    
    font-size: 1em;
    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #AAA;
        opacity: 1; /* Firefox */
    }
    :-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #AAA;
    }
    ::-ms-input-placeholder { /* Microsoft Edge */
        color: #AAA;
    }
`;

const Button = styled.button`
    border-radius: 8px;
    font-size: 1em;
    font-family: ${props => props.theme.buttonFont};
    border: 2px solid ${props => props.primaryColor ? props.primaryColor : (props.positive ? "none" : props.theme.mainColor)};
    color: ${props => props.primaryColor ? props.primaryColor : (props.positive ? "#fff" : props.theme.mainColor)};
    background: ${props => props.disabled ? "#CCC" :(props.buttonColor ? props.buttonColor : (props.positive ? "#0A0" : "transparent"))};
    overflow: hidden;
    padding: 0.3em;
    margin 0;
    outline:none;
    font-weight: regular;
    
    width: 50px;
    cursor: auto;
    
    
    &:hover {
        cursor: ${props=> props.disabled ? "auto" : "pointer"};
        color: ${props => props.primaryColor ? props.primaryColor : "#FFF"};
        background: ${props => props.disabled ? "#CCC" : (props.positive ? "#080" : props.secondaryColor)};
    }
`;





const Message = styled.div`
    color: red;
    font-weight: bold;
    padding: 10px;
    font-family: ${props => props.theme.navbarFont};
`;




export default function SubscriptionInput (props) {

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    return (
        <InputFrame width="400px">
            <Label>E-Mail</Label>
            <Input
                value={email}
                type="text"
                placeholder='Please enter your e-mail address'
                onChange={event => setEmail(event.target.value)}
            />
            <Button
                disabled={
                    !(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(email))
                }
                onClick={()=>{
                    /*const onResult = (result) => {
                        setLoading("Thank you");

                    };

                    const onError = (error) => {

                        setLoading("Sorry, something went wrong!");
                    };

                    setLoading("Loading");

                    callSubscriptionService(email, onResult, onError);
                    */
                }}
            >
                { loading ? loading : "Send" }
            </Button>
            {
                message.length > 0 && <Message>{message}</Message>
            }
        </InputFrame>
    );

};