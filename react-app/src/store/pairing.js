// constants
const MAKE_PAIR = "pairing/MAKE_PAIR"
const REMOVE_PAIR = "pairing/REMOVE_PAIR"

// action creators
const makePair = (movie) => ({
    type: MAKE_PAIR,
    payload: movie
})

const removePair = (movie) => ({
    type: REMOVE_PAIR,
    payload: movie
})

// thunks
export const makeCall = (userId, pizzaPlace) => async(dispatch) => {

    const response = await fetch(`/api/new/pair/${userId}/${pizzaPlace}`);
    const movie = await response.json()

    dispatch(makePair(movie))
    return movie;
};


// reducer
// const initialState = {}
// let newState;

export default function reducer(state = {}, action) {
    switch(action.type) {
        case MAKE_PAIR:
            return {...action.payload, ...state};
        case REMOVE_PAIR:
            // newState = {...action.payload}
            return state;
        default:
            return state;
    }
}
