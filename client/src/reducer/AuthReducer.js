const  AUTH_REDUCER_ACTION = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
};

const authReducer = (state, action) => {
    switch(action.type) {
        case AUTH_REDUCER_ACTION.LOGIN: {
            return {
                ...state,
                ...action.payload,
            }
        }
        case AUTH_REDUCER_ACTION.LOGOUT: {
            return {}
        }
        default: 
            return state;
    }
};

export {AUTH_REDUCER_ACTION};
export default authReducer;