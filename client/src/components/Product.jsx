import { NavLink } from 'react-router-dom';
import Heart from '../images/productHeart.svg'
// import Compare from '../images/compare.svg'
import Basket from '../images/productBasket.svg'
import { addProductToBasket } from "../actions/product";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import AlertComponent from './AlertComponent';
import { Rating } from '@mui/material';
import React from 'react';


const Product = (props) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth);
    const isAdmin = useSelector(state => state.user.isAdmin);
    const userId = useSelector(state => state.user.currentUser.id);
    const [alert, setAlert] = useState(false);
    const [success, setSuccess] = useState(false)
    const [reviewsLength, setReviewsLength] = useState('')

    const handleChange = (id) => {
        if (isAuth) {
            dispatch(addProductToBasket(userId, id))
            setSuccess(true)
            setAlert(true);
        } else {
            setSuccess(false);
            setAlert(true);
        }
    };

    useEffect(() => {

        let revLength = Number(props.data.reviews.length);

        if (revLength === 0) {
            setReviewsLength(props.data.reviews.length + " отзывов")
        } else if (revLength === 1) {
            setReviewsLength(props.data.reviews.length + " отзыв")
        } else if (revLength === 2 || revLength === 3 || revLength === 4) {
            setReviewsLength(props.data.reviews.length + " отзыва")
        } else {
            setReviewsLength(props.data.reviews.length + " отзывов")
        }
    }, [props.data.reviews])

    return (
        <div key={props.data._id} className={props.data.inStock ? "product" : "product product-unavailable"}>
            <div className="onsale" style={props.data.onsale && props.data.discount > 0 ? { display: 'block' } : { display: "none" }}>
                - {props.data.discount} %
            </div>
            <div className="product__img">
                <NavLink to={"/catalog/:" + props.data._id + "/info"}>
                    <img src={props.data.catalogImg} alt="" />
                </NavLink>
            </div>
            <div className="product__title">
                <NavLink to={"/catalog/:" + props.data._id + "/info"}>
                    {props.data.name}
                </NavLink>
            </div>
            <div className="product__info">
                <div className="size">
                    {props.data.size}
                </div>
                <div className="material">
                    {props.data.material}
                </div>
            </div>
            <div className="product__rate">
                <div className="stars">
                    <Rating readOnly value={props.data.rate} />
                </div>
                <div className="reviews">
                    <NavLink to={"/catalog/:" + props.data._id + "/reviews"}>
                        {reviewsLength}
                    </NavLink>
                </div>
            </div>
            <div className="product__footer">
                <div className="product__interaction">
                    <div className="price">
                        <p className='price' style={props.data.discount > 0 && props.data.onsale ? {
                            textDecorationLine: "line-through"
                        } : { fontSize: "24px" }}>
                            {props.data.price.toLocaleString("currency")} грн.
                        </p>
                        <p className="price-with-discount" style={props.data.discount > 0 && props.data.onsale ? {
                            display: "block", color: "red", fontWeight: "400", fontSize: "24px"
                        } : { display: "none" }}>
                            {Math.round(props.data.price - (props.data.price * props.data.discount) / 100).toLocaleString("currency")} грн.
                        </p>
                    </div>
                    <div className="buttons">
                        {/* <NavLink to="/compare">
                            <img src={Compare} alt="" />
                        </NavLink> */}
                        <button>
                            <img src={Heart} alt="" />
                        </button>
                    </div>
                </div>
                {props.data.inStock ? <button className='tobasket' onClick={() => {
                    handleChange(props.data._id)
                }}>
                    В корзину
                    <img src={Basket} alt="" />
                </button> : <p className='unavailable'>
                    Нет в наявности
                </p>}


            </div>
            {alert && <AlertComponent success={success} close={setAlert} />}

        </div >
    )
}

export default Product;