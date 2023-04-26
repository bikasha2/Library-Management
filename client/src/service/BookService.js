import axiosInstance from "../config/AxiosConfig";
import API_URL_CONSTANTS from "../constants/ApiUrlConstants";

const getBooks = async(token) => {
    return axiosInstance.get(API_URL_CONSTANTS.BOOKS, {
        headers: {
            Authorization: token,
        },
    });
};

export {
    getBooks,
}