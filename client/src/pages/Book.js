import React, { useContext, useEffect, useState } from 'react'
import NavMenu from '../component/navigation/NavMenu';
import { AuthContext } from '../context/AuthContextProvider';
import { borrowBook, getBooks, returnBook } from '../service/BookService';
import Table from 'react-bootstrap/Table';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Login from './Login';
import { toast } from 'react-toastify';




const Book = () => {
    const { state } = useContext(AuthContext);
    const [books, setBooks] = useState([])
    const [tableHeadings, setTableHeadings] = useState(null)
    let navigate = useNavigate();
    const borrowBookHandler = (id) => {
        borrowBook(id, state.token)
        .then(res => {
            console.log(res)
            toast.success('Book was borrowed successfully !')
        })
        .catch((err) => {
            toast.error('Book was not borrowed !');
          })

    }
    const returnBookHandler = (id) => {
        returnBook(id, state.token)
        .then(res => {
            console.log(res)
            toast.success('Book was returned successfully !')
        })
        .catch((err) => {
            toast.error('Book was not returned !');
          })

    }
    useEffect(() => {
        if(!state.token) {
            return navigate('/')
        }
        getBooks(state.token)
            .then((res) => {
                if (res.status === 200) {
                    setBooks(res.data.data);
                    const book = res.data.data[0]
                    const tableHeadings = Object.keys(book).filter(key=>["name", "category", "status"].includes(key));
                    setTableHeadings(tableHeadings);
                    
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);
    if(books.length === 0){
        return <div style={{display: 'flex', justifyContent: 'center', marginTop: '35vh'}}><Spinner /> </div>
    }
   
    return (
        <div>
            <NavMenu />
            <Table responsive style={{marginTop: '10vh'}}>
                <thead style={{textAlign: 'center'}}>
                    <tr >
                        <th>SNO.</th>
                        {tableHeadings.map((tableHeading) => (
                            <th key={tableHeading}>{tableHeading}</th>
                        ))}
                        {state.role === 'STUDENT' ? 
                        <>
                            <th>Borrow</th>
                            <th>Return</th>
                        </>
                        : null
                        }
                    </tr>
                </thead>
                <tbody style={{textAlign: 'center'}}>
                {books.map((book, index) => (
                    <tr  key={book._id}>
                        <td >{index}</td>
                        <td>{book.name}  </td>
                        <td>{book.category}</td>
                        <td>{book.status}</td>
                       {state.role === 'STUDENT' ? 
                        <>
                        <td>
                            {
                            book.status === 'ASSIGNED' ? 
                            <Button variant='success' disabled>Borrow</Button> 
                            : <Button variant='success' onClick={event => {borrowBookHandler(book._id)}}>Borrow</Button>
                            }
                        
                         </td>
                         <td>
                            {
                            book.status === 'AVAILABLE' ? 
                            <Button  disabled>Return</Button> 
                            : <Button onClick={event => {returnBookHandler(book._id)}}>Return</Button>
                            }
                            </td>
                        </>
                        : null
                       }
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
};

export default Book;
