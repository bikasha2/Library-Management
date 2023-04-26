import React, {useReducer, createContext} from 'react';
import authReducer from '../reducer/AuthReducer';

const AuthContext = createContext();
const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        token: sessionStorage.getItem('token'),
        emailId: sessionStorage.getItem('emailId'),
    });
    return(
        <AuthContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
};

export {AuthContext};
export default AuthContextProvider;
