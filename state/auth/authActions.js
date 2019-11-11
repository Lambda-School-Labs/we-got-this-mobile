import Firebase from '../../config/firebase';
import { service } from './authService';

export const types = {
    AUTH_START: 'AUTH_START',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_ERROR: 'AUTH_ERROR',

    AUTH_LOGOUT: 'AUTH_LOGOUT',

    AUTH_UPDATE_USER_START: 'AUTH_UPDATE_USER_START',
    AUTH_UPDATE_USER_SUCCESS: 'AUTH_UPDATE_USER_SUCCESS',
    AUTH_UPDATE_USER_ERROR: 'AUTH_UPDATE_USER_ERROR',
};

export const actions = {
    // async login(dispatch) {
    //     try {
    //         dispatch({ type: types.AUTH_START });
    //         const googleAuth = gapi.auth2.getAuthInstance();
    //         const googleUser = await googleAuth.signIn();

    //         const token = googleUser.getAuthResponse().id_token;

    //         const credential = auth.GoogleAuthProvider.credential(token);

    //         console.log('Token: ', token, 'Credential: ', credential);

    //         await Firebase.signInWithCredential(credential);
    //     } catch (error) {
    //         dispatch({ type: types.AUTH_ERROR });
    //     }
    // },

    async getOrCreateCurrentUser(dispatch, user) {
        try {
            dispatch({ type: types.AUTH_START });

            let data = await service.getOrCreateCurrentUser(user);
            console.log(data);

            dispatch({
                type: types.AUTH_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({ type: types.AUTH_ERROR });
        }
    },

    logout(dispatch) {
        Firebase.signOut();
        const googleAuth = gapi.auth2.getAuthInstance();
        googleAuth.signOut();
        dispatch({ type: types.AUTH_LOGOUT });
    },

    async updateCurrentUser(dispatch, user) {
        try {
            dispatch({ type: types.AUTH_UPDATE_USER_START });

            let updatedUser = await service.updateCurrentUser(user);
            if (!updatedUser) {
                throw new Error('Failed to update User');
            }
            dispatch({
                type: types.AUTH_UPDATE_USER_SUCCESS,
                payload: updatedUser,
            });
        } catch (err) {
            dispatch({ type: types.AUTH_UPDATE_USER_ERROR });
        }
    },
};
