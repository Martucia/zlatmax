import trash from '../images/trash.svg'
import edit from '../images/edit.svg'
import { useEffect, useState } from 'react';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Way from '../components/Way';
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../actions/product";
import React from 'react';
import { Pagination } from '@mui/material';

const AdminCatalog = (props) => {
    const products = useSelector(state => state.catalog.catalog);
    const isAdmin = useSelector(state => state.user.isAdmin);
    const count = useSelector(state => state.catalog.pagesCount);

    const navigate = useNavigate();

    const handleChange = (event, value) => {
        props.setPage(value);
        navigate(`/admin-catalog?page=${value}`)
        window.scrollTo(0, 0)
    };

    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const page = params.get('page');

    useEffect(() => {
        props.setPage(page || 1)
    }, [page. props])

    if (!isAdmin) return <Navigate to="/" replace />

    return (
        <div className="admin-catalog">
            <div className="admin-catalog__header">
                <Way way="Разделочные ножи" wayUlr="carving-knives" />
                <NavLink className="add-new" to="/admin-catalog/addnew">
                    Добавить новый товар
                </NavLink>
            </div>
            <div className="admin-catalog__wrapper">
                {products.map(product => {
                    return <Product product={product} />
                })}
            </div>
            {count > 1 && <Pagination sx={{
                '& .Mui-selected': {
                    backgroundColor: "#F6B817",
                    color: "#fff",
                    '&:hover': {
                        backgroundColor: "#F6B817",
                    }
                }
            }} className='pagination' page={Number(page)} onChange={handleChange} count={count} />}
        </div>
    );
}

const Product = (props) => {
    const [reviewsLength, setReviewsLength] = useState('')
    const dispatch = useDispatch()

    useEffect(() => {
        let revLength = Number(props.product.reviews.length);

        if (revLength === 0) {
            setReviewsLength(props.product.reviews.length + " отзывов")
        } else if (revLength === 1) {
            setReviewsLength(props.product.reviews.length + " отзыв")
        } else if (revLength === 2 || revLength === 3 || revLength === 4) {
            setReviewsLength(props.product.reviews.length + " отзыва")
        } else {
            setReviewsLength(props.product.reviews.length + " отзывов")
        }
    }, [props.product.reviews.length])

    const delProduct = () => {
        dispatch(deleteProduct(props.product._id))
    }


    return (
        <div className="admin-catalog-product">
            <div className="admin-catalog-product__left">
                <div className="admin-catalog-product__img">
                    <img src={props.product.catalogImg} alt="" />
                </div>
                <div className="admin-catalog-product__title">
                    <NavLink to={"/catalog/:" + props.product._id + "/info"}>
                        {props.product.name}
                    </NavLink>
                </div>
                <div className="admin-catalog-product__inStock" style={props.product.inStock ? { color: "green" } : { color: "red" }} >
                    {props.product.inStock ? "В наличии" : "Отсутствует"}
                </div>
            </div>
            <div className="admin-catalog-product__right">
                <div className="admin-catalog-product__sale" style={props.product.onsale && props.product.discount > 0 ? { display: "block" } : { display: "none" }}>
                    - {props.product.discount} %
                </div>
                <div className="admin-catalog-product__reviews">
                    <NavLink to={"/catalog/:" + props.product._id + "/reviews"}>
                        {reviewsLength}
                    </NavLink>
                </div>
                <div className="admin-catalog-product__price">
                    <p className='price' style={props.product.discount > 0 && props.product.onsale ? {
                        textDecorationLine: "line-through"
                    } : {}}>
                        {props.product.price.toLocaleString("currency")} грн.
                    </p>
                    <p className="price-with-discount" style={props.product.discount > 0 && props.product.onsale ? {
                        display: "block", color: "red", fontWeight: "400"
                    } : { display: "none" }}>
                        {Math.round(props.product.price - (props.product.price * props.product.discount) / 100).toLocaleString("currency")} грн.
                    </p>
                </div>
                <button onClick={delProduct} className='admin-catalog-product__delete'>
                    <img src={trash} alt="" />
                </button>
                <NavLink to={"/admin-catalog/edit/:" + props.product._id}>
                    <img src={edit} alt="" />
                </NavLink>
            </div>
        </div>
    )
}

export default AdminCatalog;