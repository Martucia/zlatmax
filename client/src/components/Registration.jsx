import React, { useState } from 'react';
import Input from './Input';
import { registration } from "../actions/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


function Registration(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.user.isAuth);

    useEffect(() => {
        if (props.isActive && !isAuth) {
            document.body.classList.add("noscroll");
        } else {
            props.openReg(false)
            document.body.classList.remove("noscroll");
        }
    }, [props, isAuth])

    return (
        <div className='modal' style={{justifyContent: "center"}} onClick={() => props.openReg(false)}>
            <div className="modal__content" onClick={(e) => e.stopPropagation()}>
                <button className="close" onClick={() => {
                    props.openReg(false)
                    document.body.classList.remove("noscroll");
                }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M18.3536 5.64645C18.5488 5.84171 18.5488 6.15829 18.3536 6.35355L6.35355 18.3536C6.15829 18.5488 5.84171 18.5488 5.64645 18.3536C5.45118 18.1583 5.45118 17.8417 5.64645 17.6464L17.6464 5.64645C17.8417 5.45118 18.1583 5.45118 18.3536 5.64645Z" fill="#414141" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.64645 5.64645C5.84171 5.45118 6.15829 5.45118 6.35355 5.64645L18.3536 17.6464C18.5488 17.8417 18.5488 18.1583 18.3536 18.3536C18.1583 18.5488 17.8417 18.5488 17.6464 18.3536L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645Z" fill="#414141" />
                    </svg>

                </button>
                <div className="modal__title">
                    Регистрация
                </div>
                <Input label="Имя" name={"name"} setValue={setName} value={name} type="text" placeholder="Имя" />
                <Input label="Email" name={"email"} setValue={setEmail} value={email} type="text" placeholder="Email" />
                <Input label="Пароль" name={"password"} setValue={setPassword} value={password} type="password" placeholder="Придумайте пароль" />

                <div className="modal__btn">
                    <button onClick={() => {
                        dispatch(registration(name, email, password))
                        document.body.classList.remove("noscroll");
                    }}>
                        Регистрация
                    </button>
                </div>
                <div className="modal__footer">
                    <button className="reg log" onClick={() => {
                        props.openLog(true);
                        props.openReg(false)
                    }}>
                        Войти
                    </button>
                    <button className="reset">
                        Забыли пароль?
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registration;