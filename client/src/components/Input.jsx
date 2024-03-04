import React from 'react';
import Check from "./Check"


const Input = (props) => {


    return (
        <>

            <div className="input__block">
                {props.withCheck && <Check setCheck={props.setOnSale} isCheck={props.onSale} name={props.name} checkName={props.checkName} />}
                <label htmlFor={props.name}>{props.label}</label>

                {props.discountPrice && props.onSale && (
                    <p>Ціна зі знижкою: {props.discountPrice} грн</p>
                )}

                <input className='input' disabled={props.withCheck && !props.onSale} onChange={(event) => props.setValue(event.target.value)}
                    defaultValue={props.value}
                    type={props.type || "text"}
                    placeholder={props.placeholder}
                    name={props.name}
                />
                <div id="error" className="error"></div>
            </div>
        </>
    );
};



export default Input;