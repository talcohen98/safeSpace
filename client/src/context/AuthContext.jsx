import { createContext, useReducer, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

export const AuthContext = createContext()

const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))

        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, []);

    console.log('AuthContext state: ', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

// Define PropTypes for the component
AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // 'children' should be any renderable content
};

export default { AuthContext, AuthContextProvider, authReducer }