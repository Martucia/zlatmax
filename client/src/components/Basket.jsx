import closer from "../images/closer.svg";
import deleteProduct from "../images/delete.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProductFromBasket } from '../actions/product'
import { NavLink } from 'react-router-dom';
import AlertComponent from "./AlertComponent";


const Basket = (props) => {
    const products = useSelector(state => state.user.basket);

    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.currentUser.id);
    const [basketSumm, setBasketSumm] = useState(0);

    const isAuth = useSelector(state => state.user.isAuth);

    const [basketStyle, setBasketStyle] = useState('')

    const deleteItem = (productId) => {
        dispatch(deleteProductFromBasket(productId, userId))
    };

    useEffect(() => {
        if (props.isOpen) {
            setBasketStyle('basketAnim')
            document.body.classList.add("noscroll");
        }
    }, [props.isOpen])


    function setCloseBasket(time) {
        setTimeout(function () {
            props.closeBasket(false);
        }, time);
        document.body.classList.remove("noscroll");

    }

    useEffect(() => {
        let price = 0;

        products.forEach(product => {
            price += (product.data.price * product.count)
        })
        setBasketSumm(price)
    }, [products])


    if (isAuth) return (
            <div className="basket-bg">
                <div className={'basket ' + basketStyle} >
                    <div className="title">
                        Корзина
                        <button onClick={() => {
                            setCloseBasket(340)
                            setBasketStyle('');
                        }}>
                            <img src={closer} alt="" />
                        </button>
                    </div>
                    <div className="basket__inner">
                        {products.map(product => {
                            return (
                                <div className="block">
                                    <div className="product__count">
                                        x{product.count}
                                    </div>
                                    <div className="block__inner">
                                        <div className="block__img">
                                            <img src={product.data.catalogImg} alt="" />
                                        </div>
                                        <div className="block__text">
                                            <div className="block__title">
                                                < NavLink to={'/catalog/:' + product.data._id} onClick={() => {
                                                    setCloseBasket(340);
                                                    setBasketStyle('');
                                                }}>
                                                    {product.data.name}
                                                </NavLink>
                                            </div>
                                            <div className="block__price">
                                                {product.data.price.toLocaleString("currency")} грн
                                            </div>
                                        </div>
                                    </div>

                                    <button className="delete-from-basket" onClick={() => deleteItem(product.data._id)}>
                                        <img src={deleteProduct} alt="" />
                                    </button>
                                </div>
                            )
                        })}

                    </div>
                    <div className="basket__footer">
                        <div className="basket__summ">
                            {basketSumm.toLocaleString("currency")} грн
                        </div>
                        <button className="basket-order">
                            Замовити
                        </button>
                    </div>
                </div>
            </div>
        )
    
}

export default Basket;