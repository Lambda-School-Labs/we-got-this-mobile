import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const StateProvider = ({ reducer, initialState, children }) => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateValue = () => useContext(StateContext);

export const withState = WrappedComponent => {
    return props => {
        const [state, dispatch] = useStateValue();
        return (
            <WrappedComponent state={state} dispatch={dispatch} {...props} />
        );
    };
};
