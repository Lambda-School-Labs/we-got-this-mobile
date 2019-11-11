import { types } from './authActions';

export const authState = {
    loadingUser: false,
    currentUser: null,
    errorMessage: null,
};

export default function reducer(state, action) {
    let { payload } = action;
    console.log('Dispatched Action', action);
    switch (action.type) {
        case types.AUTH_START:
            return {
                ...state,
                loadingUser: true,
            };
        case types.AUTH_SUCCESS:
            return {
                ...state,
                loadingUser: false,
                currentUser: payload,
            };
        case types.AUTH_ERROR:
            return {
                ...state,
                loadingUser: false,
                errorMessage: payload || null,
                currentUser: null,
            };
        case types.AUTH_LOGOUT:
            return {
                ...state,
                currentUser: null,
            };
        default:
            return {
                ...state,
            };
    }
}
