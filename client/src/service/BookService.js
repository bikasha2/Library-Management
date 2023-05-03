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
    return axiosInstance.post(`${API_URL_CONSTANTS.BOOK}/${id}${API_URL_CONSTANTS.BORROW}`,{},
    {
        headers: {
            Authorization: token,
        },
    });
};

const returnBook = async(id, token) => {
    return axiosInstance.post(`${API_URL_CONSTANTS.BOOK}/${id}${API_URL_CONSTANTS.RETURN}`,{},
    {
        headers: {
            Authorization: token,
        },
    });
};

const deleteBook = async(id, token) => {
    return axiosInstance.delete(`${API_URL_CONSTANTS.BOOK}/${id}`,
    {
        headers: {
            Authorization: token,
        },
    });
};

const editBook = async(bookId, name, category, token) => {
    return axiosInstance.put(`${API_URL_CONSTANTS.BOOK}/${bookId}`,{
        name: name,
        category: category,
    },
    {
        headers: {
            Authorization: token,
        },
    });
};

const assigneChange = async(bookId, status, token) => {
    return axiosInstance.put(`${API_URL_CONSTANTS.BOOKSTATUS}/${bookId}`,{
        status: status,
    },
    {
        headers: {
            Authorization: token,
        },
    });
};

const checkAssignBook = async(token) => {
    return axiosInstance.post(`${API_URL_CONSTANTS.BOOK}${API_URL_CONSTANTS.CHECKASSIGN}`,{},
    {
        headers: {
            Authorization: token,
        },
    });
};

const searchBook = async(token, name) => {
    return axiosInstance.post(`${API_URL_CONSTANTS.BOOK}${API_URL_CONSTANTS.BOOKNAME}`,{
        name: name,
    },
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
    returnBook,
    checkAssignBook,
    searchBook,
    assigneChange,
    deleteBook,
    editBook
}