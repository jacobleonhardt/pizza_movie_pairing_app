// constants
const SET_USER = "session/SET_USER"
const REMOVE_USER = "session/REMOVE_USER"

// action creators
const setUser = (user) => ({
    type: SET_USER,
    payload: user
})

const removeUser = () => ({
    type: REMOVE_USER,
})

// thunks

export const authenticate = () => async (dispatch) => {
    const response = await fetch('/api/auth/', {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (data.errors) {
        return;
    }
    dispatch(setUser(data))
}

export const login = (email, password) => async (dispatch) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return data
}

export const loginDemo = () => async (dispatch) => {
    const response = await fetch('/api/auth/login/demo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: "demo@aa.io",
            password: "password"
        })
    });
    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return data
}

export const logout = () => async (dispatch) => {
    const response = await fetch("/api/auth/logout", {
        headers: {
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    dispatch(removeUser());
};


export const signUp = (username, email, password) => async (dispatch) => {
    const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });
    const data = await response.json();
    if (data.errors) {
        console.log('##############', data.errors)
        return data;
    }
    dispatch(setUser(data))
    return {};
}

export const updateUser = (userId, username, email, password) => async (dispatch) => {
    let response;
    if (password === '') {
          response = await fetch(`/api/auth/update/${userId}`, {
              method: "PATCH",
          headers: {
             "Content-Type": "application/json",
         },
         body: JSON.stringify({
              username,
                email,
            }),
        });
    } else {
        response = await fetch(`/api/auth/update/${userId}`, {
            method: "PUT",
        headers: {
           "Content-Type": "application/json",
       },
       body: JSON.stringify({
            username,
              email,
              password,
          }),
      });
    }

    const data = await response.json();
    if (data.errors) {
        return data;
    }
    dispatch(setUser(data))
    return {};
}

export const deleteUser = (userId) => async (dispatch) => {
    const response = await fetch(`/api/auth/delete/${userId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: userId
        })
    });
    const data = await response.json();
    dispatch(removeUser());
};


const initialState = {user: null}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return {user: action.payload}
        case REMOVE_USER:
            return {user: null}
        default:
            return state;
    }
}
