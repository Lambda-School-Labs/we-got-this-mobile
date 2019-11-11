import { service } from './customerService';

export const types = {
    ADD_CUSTOMERS_START: 'ADD_CUSTOMERS_START',
    ADD_CUSTOMER_SUCCESS: 'ADD_CUSTOMER_SUCCESS',
    ADD_CUSTOMER_ERROR: 'ADD_CUSTOMER_ERROR',

    GET_CUSTOMERS_START: 'GET_CUSTOMERS_START',
    GET_CUSTOMERS_SUCCESS: 'GET_CUSTOMERS_SUCCESS',
    GET_CUSTOMERS_ERROR: 'GET_CUSTOMERS_ERROR',
};

export const actions = {
    async addCustomer(dispatch, customer) {
        try {
            dispatch({ type: types.ADD_CUSTOMER_START });

            let newCustomer = await service.addCustomer(customer);
            if (!newCustomer) {
                throw new Error('Customer failed');
            }

            dispatch({
                type: types.ADD_CUSTOMER_SUCCESS,
                payload: newCustomer,
            });
        } catch (err) {
            dispatch({ type: types.ADD_CUSTOMER_ERROR, payload: err });
        }
    },

    async getAllCustomers(dispatch, accountId) {
        try {
            dispatch({ type: types.GET_CUSTOMERS_START });
            let customers = await service.getAllCustomers(accountId);

            if (!customers || customers == null) {
                throw new Error('Getting Customers failed');
            }

            dispatch({
                type: types.GET_CUSTOMERS_SUCCESS,
                payload: customers,
            });
        } catch (err) {
            dispatch({
                type: types.GET_CUSTOMERS_ERROR,
                payload: err,
            });
        }
    },
};
