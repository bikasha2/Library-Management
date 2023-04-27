import axiosInstance from "../config/AxiosConfig";
import API_URL_CONSTANTS from "../constants/ApiUrlConstants";

const getBooks = async(token) => {
    return axiosInstance.get(API_URL_CONSTANTS.BOOKS, {
        headers: {
            Authorization: token,
        },
    });
};

const addBook = async(name, category, token) => {
    console.log(token)
    return axiosInstance.post(API_URL_CONSTANTS.ADDBOOK,
    {
        name,
        category,

    },
    {
        headers: {
            Authorization: token,
        },
    });
};

const borrowBook = async(id, token) => {
    console.log(id, token)
    return axiosInstance.post(`${API_URL_CONSTANTS.BOOK}/${id}${API_URL_CONSTANTS.BORROW}`,{},
    {
        headers: {
            Authorization: token,
        },
    });
};

const returnBook = async(id, token) => {
    console.log(id, token)
    return axiosInstance.post(`${API_URL_CONSTANTS.BOOK}/${id}${API_URL_CONSTANTS.RETURN}`,{},
    {
        headers: {
            Authorization: token,
        },
    });
};

export {
    getBooks,
    addBook,
    borrowBook,
    returnBook
}