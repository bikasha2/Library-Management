import axios from 'axios';
import  API_URL_CONSTANTS  from '../constants/ApiUrlConstants';

const axiosInstance = axios.create({
    baseURL: API_URL_CONSTANTS.BASE_URL,
});

export default axiosInstance;