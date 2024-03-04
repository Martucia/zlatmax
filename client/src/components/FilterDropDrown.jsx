import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import dropArrow from "../images/filter-drop-btn.svg"
import React from 'react';


const FilterDropDrown = (props) => {
    const [isOpen, setOpen] = useState(true)

    function handleChange(e, val) {
        if (e.target.checked) {
            if (props.title === "Производство") {
                props.set({
                    ...props.all,
                    manufacture: [...props.all.manufacture, val]
                })
            } else if (props.title === "Сталь") {
                props.set({
                    ...props.all,
                    steel: [...props.all.steel, val]
                })
            } else if (props.title === "Рукоять") {
                props.set({
                    ...props.all,
                    handle: [...props.all.handle, val]
                })
            } else if (props.title === "Гарда и тыльник") {
                props.set({
                    ...props.all,
                    guardback: [...props.all.guardback, val]
                })
            }
        } else {
            if (props.title === "Производство") {
                props.set({
                    ...props.all,
                    manufacture: props.all.manufacture.filter(filter => {
                        return filter !== val
                    })
                })
            } else if (props.title === "Сталь") {
                props.set({
                    ...props.all,
                    steel: props.all.steel.filter(filter => {
                        return filter !== val
                    })
                })
            } else if (props.title === "Рукоять") {
                props.set({
                    ...props.all,
                    handle: props.all.handle.filter(filter => {
                        return filter !== val
                    })
                })
            } else if (props.title === "Гарда и тыльник") {
                props.set({
                    ...props.all,
                    guardback: props.all.guardback.filter(filter => {
                        return filter !== val
                    })
                })
            }
            // props.set(filters.filter(item => item !== val))
        }
    };

    const toggleDropDown = () => {
        if (isOpen) {
            setOpen(false)
        } else {
            setOpen(true)
        }
    }

    return (
        <div className="drop-down">

            <div className="drop-down__title">
                {props.title}
                <button className={isOpen ? "close" : ''} onClick={toggleDropDown}>
                    <img src={dropArrow} alt="" />
                </button>
            </div>
            <div className="drop-down__inner" style={isOpen ? { display: 'flex' } : { display: "none" }}>
                {props.data.map(name => {
                    return (
                        <FormControlLabel
                            control={
                                <Checkbox onChange={(e) => handleChange(e, name)} />
                            }
                            label={name}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default FilterDropDrown;