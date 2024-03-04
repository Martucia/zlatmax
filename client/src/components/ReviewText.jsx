import { useCallback, useEffect, useState } from "react";
import React from 'react';

const ReviewText = (props) => {
    const [text, setText] = useState('')
    const [isOpen, setOpen] = useState(false)
    const [isNecessary, setNecessary] = useState(false)

    const sliceText = useCallback(() => {
        let out = props.text.slice(0, 250);
        out += "...";
        return out;
        // setText(out)
    }, [props.text])

    useEffect(() => {
        if (props.text.length > 250) {
            setText(sliceText)
            setNecessary(true)
        } else {
            setText(props.text)
        }
    }, [props.text, sliceText])


    return (
        <div className="review__inner__text">
            {text}
            <button style={{ display: isNecessary ? 'block' : 'none' }} onClick={() => {
                if (isOpen) {
                    setOpen(false)
                    sliceText();
                } else {
                    setOpen(true)
                    setText(props.text)
                }
            }}>
                {isOpen ? "Скрити" : "Показати все..."}

            </button>
        </div>
    );
}


export default ReviewText;