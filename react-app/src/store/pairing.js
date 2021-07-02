// constants
const GET_PAIR = "pairing/GET_PAIR"
const MAKE_PAIR = "pairing/MAKE_PAIR"
const REMOVE_PAIR = "pairing/REMOVE_PAIR"
const RESET_PAIR = "pairing/RESET_PAIR"

// action creators
const getPair = (list) => ({
    type: GET_PAIR,
    payload: list
})

const makePair = (movie) => ({
    type: MAKE_PAIR,
    payload: movie
})

const removePair = (movie) => ({
    type: REMOVE_PAIR,
    payload: movie
})

const resetPairs = () => ({
    type: RESET_PAIR
})

// thunks

export const getPairs = (userId) => async (dispatch) => {
    const response = await fetch(`/api/pair/${userId}`);
    const list = await response.json();

    dispatch(getPair(list))
    return list;
};

export const makeCall = (userId, pizzaPlace) => async(dispatch) => {

    const response = await fetch(`/api/pair/new/${userId}/${pizzaPlace}`);
    const movie = await response.json()

    dispatch(makePair(movie))
    return movie;
};

export const resetPrevPairs = () => async(dispatch) => {
    dispatch(resetPairs());
};



// reducer
const initialState = []
let newState;

export default function pairingReducer(state = initialState, action) {
    switch(action.type) {
        case GET_PAIR:
            newState = [...action.payload]
            return newState;
        case MAKE_PAIR:
            newState = [{...action.payload}, ...state]
            return newState;
        case REMOVE_PAIR:
            newState = {...action.payload}
            return newState;
        case RESET_PAIR:
            newState = initialState
            return newState;
        default:
            return state;
    }
}
