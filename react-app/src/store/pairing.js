// constants
const MAKE_PAIR = "pairing/MAKE_PAIR"
const REMOVE_PAIR = "pairing/REMOVE_PAIR"

// action creators
const makePair = (pair) => ({
    type: MAKE_PAIR,
    payload: pair
})

const removePair = (pair) => ({
    type: REMOVE_PAIR,
    payload: pair
})

// thunks
export const makeCall = (pizzaPlace) => {

};


// reducer
const initialState = {previous: []}
let newState;

export default function reducer(state = initialState, action) {
    switch(action.type) {
        case MAKE_PAIR:
            newState = {...action.payload, ...state}
            return newState;
        case REMOVE_PAIR:
            newState = {...action.payload}
            return newState;
        default:
            return state;
    }
}
