import axiosInstance from "../config/AxiosConfig";

const loginUser = async({emailId, password}) => {
    return axiosInstance.post('/login', {
        emailId,
        password,
    })
}

export default loginUser;