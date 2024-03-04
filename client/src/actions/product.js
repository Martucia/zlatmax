import axios from 'axios'
import { addToBasket, removeFromBasket, setLoading } from "../reducers/userReducer";
import { setProducts, addReviewtoState, editProductReducer, deleteProductReducer, addProduct } from "../reducers/productReducer";



export const setCatalog = (page) => {
    return async dispatch => {
        try {
            
            dispatch(setLoading(true))

            const response = await axios.get(`http://localhost:5000/api/catalog?page=${page}`);

            dispatch(setProducts(response.data.products, response.data.count))
            dispatch(setLoading(false))

        } catch (e) {
            // alert(e.response.data.message)
            console.log(e)

        }
    }
}

export const addNewProduct = (product) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await axios.post(`http://localhost:5000/api/catalog/addproduct`,
                product
            );

            dispatch(addProduct(response.data.product))
            dispatch(setLoading(false))
        } catch (e) {
            // alert(e.response.data.message)
            console.log(e)

        }
    }
}

export const addProductToBasket = (userId, id) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await axios.patch(`http://localhost:5000/api/catalog/addtobasket/:${userId}`, {
                id
            });

            dispatch(addToBasket(response.data.product))
            dispatch(setLoading(false))

        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteProductFromBasket = (id, userId) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            await axios.delete(`http://localhost:5000/api/catalog/removeproduct?productId=${id}&userId=${userId}`);

            dispatch(removeFromBasket(id))
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e)
        }
    }
}

export const editProduct = (updates, id) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await axios.patch(`http://localhost:5000/api/catalog/edit/${id}`, {
                updates
            });

            dispatch(editProductReducer(response.data.product))
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteProduct = (id) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            await axios.delete(`http://localhost:5000/api/catalog/delete/:${id}`);

            dispatch(deleteProductReducer(id))
            dispatch(setLoading(false))
        } catch (e) {
            console.log(e)
        }
    }
}


export const addReview = (text, productId, userId, rate) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            const response = await axios.patch(`http://localhost:5000/api/catalog/addreview`, {
                text,
                productId,
                userId,
                rate
            });

            dispatch(addReviewtoState(response.data.review))
            dispatch(setLoading(false))

        } catch (e) {
            console.log(e)
        }
    }
}

export const deleteReview = (productId, reviewId) => {
    return async dispatch => {
        try {
            dispatch(setLoading(true))
            await axios.patch(`http://localhost:5000/api/catalog/removereview`, {
                productId,
                reviewId
            });

            // dispatch(deleteReviewfromState(productId, reviewId))
            dispatch(setLoading(false))

        } catch (e) {
            console.log(e)
        }
    }
}