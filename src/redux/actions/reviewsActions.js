import { getAllReviews, getReviewByProduct, getReviewByUser, uploadReview } from "../../firebase/Reviews";

export const GET_ALL_REVIEWS = 'GET_ALL_REVIEWS';
export const GET_PRODUCT_REVIEWS = 'GET_PRODUCT_REVIEWS';
export const GET_USER_REVIEWS = 'GET_USER_REVIEWS';

export function getAllReviewsFront() {
    return async function (dispatch) {
        try {
            let jsonReviews = await getAllReviews();
            //console.log("-GetAllReviews Flag-", jsonReviews);
            return dispatch({
                type: GET_ALL_REVIEWS,
                payload: jsonReviews,
            });
        } catch (error) {
            console.log(error);
        }
    };
}


// payload === uid del producto
export function getReviewsByProductFront(payload) {
    return async function (dispatch) {
        try {
            let jsonReviews = await getReviewByProduct(payload);
            //console.log("-GetProductReviews Flag-", jsonReviews);
            return dispatch({
                type: GET_PRODUCT_REVIEWS,
                payload: jsonReviews,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

// payload === uid del user
export function getReviewsByUserFront(payload) {
    return async function (dispatch) {
        try {
            let jsonReviews = await getReviewByUser(payload);
            //console.log("-GetProductReviews Flag-", jsonReviews);
            return dispatch({
                type: GET_USER_REVIEWS,
                payload: jsonReviews,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export function postReview(payload) {
    return async function (dispatch) {
        const jsonReviewPost = await uploadReview(payload);
        console.log("jsonReviewPost", jsonReviewPost);
        return jsonReviewPost;
    };
}