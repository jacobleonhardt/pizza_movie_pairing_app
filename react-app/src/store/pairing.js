// constants
const GET_PAIR = "pairing/GET_PAIR"
const MAKE_PAIR = "pairing/MAKE_PAIR"
const MAKE_PIZZA_PAIR = "pairing/MAKE_PIZZA_PAIR"
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

const makePizzaPair = (pizza) => ({
    type: MAKE_PIZZA_PAIR,
    payload: pizza
})

const removePair = (list) => ({
    type: REMOVE_PAIR,
    payload: list
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

export const makePizzaCall = (userId, movieTitle, movieYear) => async(dispatch) => {

    const response = await fetch(`/api/pair/new/${userId}/${movieTitle}/${movieYear}`);
    const pizza = await response.json()

    dispatch(makePizzaPair(pizza))
    return pizza;
}

export const makeDiffCall = (userId, pizzaPlace, pairId) => async(dispatch) => {

    const response = await fetch(`/api/pair/new/${userId}/${pizzaPlace}`);
    const movie = await response.json()
    await fetch(`/api/pair/delete/${pairId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            pairId
        })
    });
    dispatch(makePair(movie))
    return movie;
};

export const deletePair = (userId, pairId) => async(dispatch) => {
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
    dispatch(removePair(newPrePairs));
}

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
        case MAKE_PIZZA_PAIR:
            newState = [{...action.payload}, ...state]
            return newState;
        case REMOVE_PAIR:
            newState = [...action.payload]
            return newState;
        case RESET_PAIR:
            newState = initialState;
            return newState;
        default:
            return state;
    }
}
