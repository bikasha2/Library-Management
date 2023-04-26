import React, { useContext, useEffect, useState } from 'react'
import NavMenu from '../component/navigation/NavMenu';
import { AuthContext } from '../context/AuthContextProvider';
import { getBooks } from '../service/BookService';
import Table from 'react-bootstrap/Table';

const Book = () => {
    const { state } = useContext(AuthContext);
    const [books, setBooks] = useState([])
    useEffect(() => {
        getBooks(state.token)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data.data)
                    setBooks(res.data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);
    return (
        <div>
            <NavMenu />
            <Table responsive style={{marginTop: '10vh'}}>
                <thead>
                    <tr>
                        <th>#</th>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <th key={index}>Table heading</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>2</td>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                    <tr>
                        <td>3</td>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <td key={index}>Table cell {index}</td>
                        ))}
                    </tr>
                </tbody>
            </Table>
        </div>
    )
};

export default Book;
