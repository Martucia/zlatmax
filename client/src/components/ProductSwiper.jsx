
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Reviews from "./Reviews"
import { NavLink } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { useParams } from "react-router-dom";
import React from 'react';


const ProductSwiper = (props) => {
    const [deliveryCountry, setDeliveryCountry] = useState("ua");
    const [deliveryCity, setDeliveryCity] = useState("kv");



    const changeCountry = (event) => {
        setDeliveryCountry(event.target.value);
    };

    const changeCity = (event) => {
        setDeliveryCity(event.target.value);
    };

    let { id } = useParams();

    return (
        <div className="product-swiper" ref={props.refName}>
            <div className="product-swiper__header">
                < NavLink to={"/catalog/" + id + "/info"} activeclassname='open'>
                    Описание
                </NavLink>
                < NavLink to={"/catalog/" + id + "/characteristic"} activeclassname='open'>
                    Характеристика
                </NavLink>
                < NavLink to={"/catalog/" + id + "/reviews"} activeclassname='open'>
                    Отзывы
                </NavLink>
                < NavLink to={"/catalog/" + id + "/delivery"} activeclassname='open'>
                    Доставка
                </NavLink>
            </div>
            <div className="product-swiper__inner">
                <Routes>
                    <Route path="/info" element={<Info desc={props.desc} />} />
                    <Route path="/characteristic" element={<Characteristic />} />
                    <Route path="/reviews" element={<Reviews product={props.product} setProduct={props.setProduct} reviews={props.reviews} productId={props.productId} />} />
                    <Route path="/delivery" element={<Delivery setCountry={changeCountry} setCity={changeCity} country={deliveryCountry} city={deliveryCity} />} />
                </Routes>
            </div>
        </div>
    );
}


const Info = (props) => {
    return (
        <div className="product-swiper__info">
            {props.desc}
        </div>
    )

}

const Characteristic = () => {
    return (
        <div className="product-swiper__characteristic">
            <div className="characteristic-column">
                <div className="title">
                    Технические характеристики
                </div>
                <ul>
                    <li>
                        <p>
                            Общая длина, мм:
                        </p>
                        <p>
                            227
                        </p>
                    </li>
                    <li>
                        <p>
                            Длина клинка, мм:
                        </p>
                        <p>
                            112
                        </p>
                    </li>
                    <li>
                        <p>
                            Ширина клинка, мм:
                        </p>
                        <p>
                            24
                        </p>
                    </li>
                    <li>
                        <p>
                            Толщина обуха, мм:
                        </p>
                        <p>
                            2.9
                        </p>
                    </li>
                </ul>
            </div>
            <div className="characteristic-column">
                <div className="title">
                    Используемые материалы
                </div>
                <ul>
                    <li>
                        <p>
                            Сталь:
                        </p>
                        <p>
                            95Х18
                        </p>
                    </li>
                    <li>
                        <p>
                            Рукоять:
                        </p>
                        <p>
                            Накладки карельская береза
                        </p>
                    </li>
                </ul>
            </div>
            <div className="characteristic-column">
                <div className="title">
                    Производство
                </div>
                <ul>
                    <li>
                        <p>
                            Производство:
                        </p>
                        <p>
                            АиР
                        </p>
                    </li>
                </ul>
            </div>
        </div>
    )

}

const Delivery = (props) => {
    return (
        <div className="product-swiper__delivery">
            <div className="delivery__column">
                <p className='label'>Ваша страна:</p>
                <p className='label'>Ваш город:</p>
            </div>

            <div className="delivery__column selecters">
                <Select
                    value={props.country}
                    onChange={props.setCountry}
                    inputProps={{ 'aria-label': 'Without label' }}
                    height={50}
                >
                    <MenuItem value={"ua"}>Україна</MenuItem>
                    <MenuItem value={"pl"}>Польша</MenuItem>
                    <MenuItem value={"rm"}>Румунія</MenuItem>
                </Select>
                <Select
                    value={props.city}
                    onChange={props.setCity}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value={"kv"}>Київ</MenuItem>
                    <MenuItem value={"tr"}>Тернопіль</MenuItem>
                    <MenuItem value={"lv"}>Львів</MenuItem>
                    <MenuItem value={"dn"}>Дніпро</MenuItem>
                    <MenuItem value={"od"}>Одеса</MenuItem>
                </Select>

            </div>

        </div>
    )

}


export default ProductSwiper;