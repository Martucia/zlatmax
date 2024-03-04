import { useEffect, useState } from 'react';
// import Input from "./Input"
import { addReview, deleteReview } from "../actions/product";
import { useDispatch, useSelector } from "react-redux";
import img from "../images/avatar.png"
import Heart from '../images/productHeart.svg'
import ReviewText from './ReviewText';
import { Rating } from '@mui/material';
import React from 'react';
import trash from '../images/trash.svg'


const Reviews = (props) => {

    return (
        <div className="product-swiper__reviews">
            <ReviewsEmpty product={props.product} setProduct={props.setProduct} length={props.reviews.length} productId={props.productId} revOpen={props.revOpen} />
            {props.reviews.map(review => {
                return <Review product={props.product} setProduct={props.setProduct} name={review.author} rate={review.rate} productId={review.owner} date={review.date} text={review.text} reviewId={review._id} />
            })}
        </div>
    )
}

const ReviewsEmpty = (props) => {
    const [openInput, setOpenInput] = useState(false)
    const [inputVal, setInputVal] = useState('')
    const [rate, setRate] = useState(null)

    const dispatch = useDispatch()
    const userName = useSelector(state => state.user.currentUser.name);
    const userId = useSelector(state => state.user.currentUser.id);


    useEffect(() => {
        if (props.length > 0) setOpenInput(true)
    }, [props.length])

    const sendReview = () => {
        if (userName) {

            if (rate) {
                dispatch(addReview(inputVal, props.productId, userId, rate))
                let rev = {
                    text: inputVal,
                    author: userName,
                    authorId: userId,
                    rate: rate,
                    date: 'Сейчас',
                    owner: props.productId,
                }

                let newReviews = props.product.reviews.push(rev)
                props.setProduct({ ...props.product, review: newReviews })
                setInputVal('')
                setRate(null)
            } else {
                alert("Поставте оценку продукту")
            }

        } else {
            alert("Войдите в аккаунт")
        }
    }

    return (
        <>
            <div className='product-swiper__reviews-row empty' style={!openInput ? { display: 'flex' } : { display: 'none' }} >
                {/* style={!openInput ? { display: 'flex', alignItems: "center", flexDirection: "row" } : { display: 'none' }} */}
                <div>
                    У данного товара нет отзывов. Станьте первым, кто оставил отзыв об этом товаре!
                </div>
                <button onClick={() => setOpenInput(true)}>
                    Написать отзыв
                </button>
            </div>

            <div className='product-swiper__reviews-row' style={{ display: openInput ? 'flex' : 'none' }}>

                <label htmlFor="review-send">Напишите свой отзыв о этом продукте</label>

                <div className="input__block">
                    <input onChange={(e) => setInputVal(e.target.value)}
                        value={inputVal}
                        type="text"
                        placeholder="Ваш отзыв"
                        name="review-send"
                    />
                    <button onClick={() => sendReview()}>
                        Отправить отзыв
                    </button>
                </div>
                <div id="error" className="error"></div>
                <div className="rating">
                    <p>
                        Поставте оценку продукту:
                    </p>
                    <Rating value={rate} onChange={(event, newValue) => {
                        setRate(newValue);
                    }} />
                </div>
            </div>
        </>
    );
}

const Review = (props) => {
    const userName = useSelector(state => state.user.currentUser.name);
    const isAdmin = useSelector(state => state.user.isAdmin);

    const dispatch = useDispatch()

    const deleteRev = () => {
        dispatch(deleteReview(props.productId, props.reviewId))

        // let newReviews = 

        // props.setProduct({...props.product, props.product.reviews = props.product.reviews.filter(review => review._id !== props.reviewId)})

        // props.setProduct(props.product.reviews.filter(review => review._id !== props.reviewId))

        // let out = props.product.reviews.filter(review => {
        //     console.log(review._id, props.reviewId)
        //     if(review._id !== props.reviewId) return review
        // })

        // let out2 = props.product;
        // out2.reviews = out;
        // console.log(out)
        // console.log(props.product)
        // console.log(out2)

        // props.setProduct(out2)
    }



    return (
        <div className="review">
            <div className="review__img">
                <img src={img} alt="" />
            </div>
            <div className="review__inner">
                <div className="review__inner__header">
                    <div className="title">
                        {props.name}
                    </div>
                    <div className="review__inner__header__right">
                        <div className="date">
                            {props.date.split('T')[0]}
                        </div>
                        <button onClick={deleteRev} className="delete" style={userName || isAdmin ? { display: 'flex' } : { display: 'none' }}>
                            <img src={trash} alt="" />
                        </button>
                    </div>

                </div>
                <Rating readOnly value={props.rate} />

                <ReviewText text={props.text} />

                <div className="review__inner__footer">
                    <button className='answer'>
                        Ответить
                    </button>

                    <button className="like">
                        <img src={Heart} alt="" />
                    </button>


                </div>
            </div>
        </div>

    );
}

export default Reviews;