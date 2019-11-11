//
//Import in individual reducers here
import authReducer, { authState } from '../auth/authReducer';
import customerReducer, { customerState } from '../customer/customerReducer';

//
//Destructure state object here
export const mainReducer = ({ auth, customers }, action) => {
    console.log('Auth: ', auth);
    console.log('Customers: ', customers);
    return {
        //
        //Middleware goes here, i.e. calling analytic, etc...

        //
        //Destructure state object and define with reducer here
        auth: authReducer(auth, action),
        customers: customerReducer(customers, action),
    };
};

export const initialState = {
    auth: authState,
    customers: customerState,
};
