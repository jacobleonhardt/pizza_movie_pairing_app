// constants
const GET_REVIEWS = "review/GET_REVIEWS"
const SET_REVIEW = "review/SET_REVIEW"
const REMOVE_REVIEW = "review/REMOVE_REVIEW"
const RESET_REVIEW = "review/RESET_REVIEW"

// action creators
const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    payload: reviews
})

const setReview = (review) => ({
    type: SET_REVIEW,
    payload: review
})

const removeReview = (review) => ({
    type: REMOVE_REVIEW,
    payload: review
})

const resetReviews = () => ({
    type: RESET_REVIEW
})

// thunks

export const getPastReviews = (userId) => async (dispatch) => {
    const response = await fetch(`/api/review/${userId}`);
    const list = await response.json();

    dispatch(getReviews(list))
    return list;
};

export const newReview = (vote, userId, pairId) => async(dispatch) => {
    const response = await fetch(`/api/review/${vote}/${userId}/${pairId}`);
    const review = await response.json()


    dispatch(setReview(review))
    return review;
};

export const deleteReview = (userId) => async(dispatch) => {
    const response = await fetch(`/api/pair/delete/${userId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId
        })
    });
    const newPrePairs = await response.json()
    dispatch(removeReview(newPrePairs));
}

export const resetUserReviews = () => async(dispatch) => {
    dispatch(resetReviews());
};



// reducer
const initialState = []
let newState;

export default function reviewReducer(state = initialState, action) {
    switch(action.type) {
        case GET_REVIEWS:
            newState = [...action.payload]
            return newState;
        case SET_REVIEW:
            newState = [{...action.payload}, ...state]
            return newState;
        case REMOVE_REVIEW:
            newState = initialState
            return newState;
        case RESET_REVIEW:
            newState = initialState
            return newState;
        default:
            return state;
    }
}
