import React, { useContext, useEffect, useState } from 'react'
import NavMenu from '../component/navigation/NavMenu';
import { AuthContext } from '../context/AuthContextProvider';
import { borrowBook, getBooks, returnBook } from '../service/BookService';
import Table from 'react-bootstrap/Table';
import { Spinner } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';


const Book = () => {
    const { state } = useContext(AuthContext);
    const [books, setBooks] = useState([])
    const [tableHeadings, setTableHeadings] = useState(null)
    let navigate = useNavigate();
    const borrowTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Borrow a book
    </Tooltip>
    );
    const returnTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Return a book
        </Tooltip>
    );
    

    const borrowBookHandler = (id) => {
        borrowBook(id, state.token)
        .then(res => {
            toast.success('Borrowed book successfully !')
            const updatedBooks = books.map(book => {
                if(book._id === id){
                    return {
                        ...book,
                        status: 'ASSIGNED'
                    }
                }
                return book
            })
            setBooks(updatedBooks);
        })
        .catch((err) => {
            toast.error('Book was not borrowed !');
          })

    }
    const returnBookHandler = (id) => {
        returnBook(id, state.token)
        .then(res => {
            const updatedBooks = books.map(book => {
                if(book._id === id){
                    return {
                        ...book,
                        status: 'AVAILABLE'
                    }
                }
                return book
            })
            setBooks(updatedBooks);
            toast.success('Returned book successfully !')
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
                        <th>sno.</th>
                        {tableHeadings.map((tableHeading) => (
                            <th key={tableHeading}>{tableHeading}</th>
                        ))}
                        {state.role === 'STUDENT' ? 
                        <>
                            <th>borrow</th>
                            <th>return</th>
                        </>
                        : null
                        }
                    </tr>
                </thead>
                <tbody style={{textAlign: 'center'}}>
                {books.map((book, index) => (
                    <tr  key={book._id}>
                        <td >{index+1}</td>
                        <td>{book.name}  </td>
                        <td>{book.category}</td>
                        <td>{book.status}</td>
                       {state.role === 'STUDENT' ? 
                        <>
                        <td>
                            {
                            book.status === 'ASSIGNED' ? 
                            <Button variant='success' disabled>Borrow</Button> 
                            : 
                            <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={borrowTooltip}
                            >
                                <Button variant='success' onClick={event => {borrowBookHandler(book._id)}}>Borrow</Button>
                            </OverlayTrigger>
                            }
                        
                         </td>
                         <td>
                            {
                            book.status === 'AVAILABLE' ? 
                            <Button  disabled>Return</Button> 
                            : 
                            <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={returnTooltip}
                            >
                                <Button onClick={event => {returnBookHandler(book._id)}}>Return</Button>
                            </OverlayTrigger>
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
