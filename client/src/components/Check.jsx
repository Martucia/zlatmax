import React from 'react';

const Check = (props) => {
    return (
        <div className="check">
            <input onClick={() => {
                if (props.isCheck) {
                    props.setCheck(false)
                } else {
                    props.setCheck(true)
                }
            }} defaultChecked={props.isCheck} type="checkbox" id={props.name} name={props.name} />
            <label htmlFor={props.name}>{props.checkName} </label>
        </div>
    )
}

export default Check;