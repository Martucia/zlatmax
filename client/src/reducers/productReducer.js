const SET_PRODUCTS = "SET_PRODUCTS"
const ADD_REVIEW = "ADD_REVIEW"
const EDIT_PRODUCT = "EDIT_PRODUCT"
const DEL_ITEM = "DEL_ITEM"
const ADD_PRODUCT = "ADD_PRODUCT"
const DELETE_REVIEW = "DELETE_REVIEW"

const defaultState = {
    catalog: [],
    pagesCount: null
}

export default function productReducer(state = defaultState, action) {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                catalog: action.payload,
                pagesCount: action.count
            }
        case ADD_REVIEW:
            return {
                ...state,
                catalog: state.catalog.map(product => {
                    if (product._id === action.payload.owner) {
                        product.reviews.push(action.payload)
                    }
                    return product;
                })
            }
        case DELETE_REVIEW:
            // console.log(action.payload, action.productId)
            return {
                ...state,
                catalog: state.catalog.map(product => {
                    // console.log(11, product._id, action.productId)
                    if (product._id === action.productId) {
                        // console.log(product)
                        product.reviews.filter(review => {
                            // console.log(22, review._id, action.payload)
                            return review._id !== action.payload
                        })
                    }
                    return product;
                })
            }
        case EDIT_PRODUCT:

            return {
                ...state,
                catalog: state.catalog.map(product => product._id === action.payload._id
                    ? action.payload
                    : product
                )
            }
        case DEL_ITEM:
            return {
                ...state,
                catalog: state.catalog.filter(product => {
                    return product._id !== action.payload
                })
            }
        case ADD_PRODUCT:
            return {
                ...state,
                catalog: [...state.catalog, action.payload]
            }
        default:
            return state
    }
}

export const setProducts = (products, count) => ({ type: SET_PRODUCTS, payload: products, count })
export const addReviewtoState = review => ({ type: ADD_REVIEW, payload: review })
export const deleteReviewfromState = (productId, reviewId) => ({ type: DELETE_REVIEW, payload: reviewId, productId })
export const editProductReducer = product => ({ type: EDIT_PRODUCT, payload: product })
export const deleteProductReducer = productId => ({ type: DEL_ITEM, payload: productId })
export const addProduct = product => ({ type: ADD_PRODUCT, payload: product })


