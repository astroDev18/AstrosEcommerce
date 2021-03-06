import {
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST, PRODUCT_DETAILS_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/productConstants";
import Axios from "axios";

// Action to get list of products from backend
export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCT_LIST_REQUEST
    })

    try {
        const {data} = await Axios.get('/api/products');
        dispatch({type: PRODUCT_LIST_SUCCESS, payload: data})
    } catch (e) {
        dispatch({type: PRODUCT_LIST_FAIL, payload: e.message});
    }
}
// Returns data of product from backend
export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({type: PRODUCT_DETAILS_REQUEST, payload: productId})
    try {
        const {data} = await Axios.get(`/api/products/${productId}`)
        // Successful operation sends product payload info to action payload
        dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
    } catch (e) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, payload: e.response && e.response.data.message
                ? e.response.data.message
                : e.message
        })
    }
}