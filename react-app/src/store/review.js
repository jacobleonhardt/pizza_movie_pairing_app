// constants
const GET_REVIEWS = "review/GET_REVIEWS"
const GOOD_REVIEW = "review/GOOD_REVIEW"
const BAD_REVIEW = "review/BAD_REVIEW"
const REMOVE_REVIEW = "review/REMOVE_REVIEW"
// const RESET_REVIEW = "review/RESET_REVIEW"

// action creators
const getReviews = (list) => ({
    type: GET_REVIEWS,
    payload: list
})

const good = (movie) => ({
    type: GOOD_REVIEW,
    payload: movie
})

const bad = (movie) => ({
    type: BAD_REVIEW,
    payload: movie
})

const removeReview = (list) => ({
    type: REMOVE_REVIEW,
    payload: list
})

// const resetPairs = () => ({
//     type: RESET_REVIEW
// })

// thunks

export const getPastReviews = (userId) => async (dispatch) => {
    const response = await fetch(`/api/pair/${userId}`);
    const list = await response.json();

    dispatch(getReviews(list))
    return list;
};

export const newReview = (vote, userId, pairId) => async(dispatch) => {
    const response = await fetch(`/api/review/${vote}/${userId}/${pairId}`);
    const review = await response.json()

    dispatch(good(review))
    return review;
};

// export const badReview = (userId, pairId) => async(dispatch) => {

//     const response = await fetch(`/api/review/bad/${userId}/${pairId}`);
//     const review = await response.json()

//     dispatch(bad(review))
//     return review;
// };

export const deleteReview = (userId, pairId) => async(dispatch) => {
    const response = await fetch(`/api/pair/delete/${pairId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            pairId
        })
    });
    const newPrePairs = await response.json()
    dispatch(removeReview(newPrePairs));
}

// export const resetPrevPairs = () => async(dispatch) => {
//     dispatch(resetPairs());
// };



// reducer
const initialState = []
let newState;

export default function reviewReducer(state = initialState, action) {
    switch(action.type) {
        case GET_REVIEWS:
            newState = [...action.payload]
            return newState;
        case GOOD_REVIEW:
            newState = [{...action.payload}, ...state]
            return newState;
        case BAD_REVIEW:
            newState = [...action.payload]
            return newState;
        case REMOVE_REVIEW:
            newState = initialState
            return newState;
        default:
            return state;
    }
}
