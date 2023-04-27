import React, {useReducer, createContext} from 'react';
import authReducer from '../reducer/AuthReducer';

const AuthContext = createContext();
const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        token: sessionStorage.getItem('token'),
        emailId: sessionStorage.getItem('emailId'),
        role: sessionStorage.getItem('role'),
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
