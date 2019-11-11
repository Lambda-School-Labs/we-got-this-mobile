import { types } from './customerActions';

export const customerState = {
    loadingNewCustomer: false,
    customers: [],
    errorMessage: null,
};

export default function reducer(state, action) {
    let { payload } = action;

    switch (action.type) {
        case types.ADD_CUSTOMER_START:
            return {
                ...state,
                loadingNewCustomer: true,
            };
        case types.ADD_CUSTOMER_SUCCESS:
            return {
                ...state,
                loadingNewCustomer: false,
                customers: [...state.customers, payload],
            };
        case types.ADD_CUSTOMER_ERROR:
            return {
                ...state,
                loadingNewCustomer: false,
                errorMessage: 'Uh Oh... something failed',
            };
        case types.GET_CUSTOMERS_SUCCESS:
            return {
                ...state,
                customers: payload,
            };
        default:
            return {
                ...state,
            };
    }
}
