import { NavLink } from 'react-router-dom';
import Right from '../images/right.svg'
import Product from './Product';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
// import axios from 'axios';
import React from 'react';



const Shelf = () => {
    // const [products, setProducts] = useState([]);
    const products = useSelector(state => state.catalog.catalog);

    // const productsOnSale = useSelector(state => {
    //     console.log(state.catalog)
    //     return state.catalog.map(product => product.onsale ? product : null)
    // })


    // useEffect(() => {
    //     axios.get(`http://localhost:5000/api/catalog/`).then((response) => {
    //         setProducts(response.data.products);
    //     });
    // }, []);

    // useEffect(() => {
    //     setProducts(catalog.slice(0, 3))
    //     console.log(344)
    // }, [])


    return (
        <div className="shelf">
            <div className="shelf__header">
                <div className="title">
                    Хиты продаж
                </div>
                <NavLink to="/catalog">
                    Перейти в каталог
                    <img src={Right} alt="" />
                </NavLink>
            </div>
            <div className="shelf__wrapper">
                {products.map(product => {
                    return <Product data={product} />
                })}
            </div>
            <div className="shelf__mobile-btn">
                <NavLink to="/catalog">
                    Все акции
                    <img src={Right} alt="" />
                </NavLink>
            </div>
        </div>
    );
}



export default Shelf;