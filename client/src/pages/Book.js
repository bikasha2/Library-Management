import React, { useContext, useEffect, useRef, useState } from 'react'
import NavMenu from '../component/navigation/NavMenu';
import { AuthContext } from '../context/AuthContextProvider';
import { assigneChange, borrowBook, checkAssignBook, deleteBook, getBooks, returnBook } from '../service/BookService';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { AssignedBook } from '../component/book/AssignedBook';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { searchBook } from '../service/BookService';
import Card from 'react-bootstrap/Card';
import {
    borrowTooltip,
    returnTooltip,
    availableBookTooltip,
    assignedBookTooltip,
    deleteBookTooltip,
    editBookTooltip
} from '../util/Tooltip';
import Footer from '../component/Footer';
import EditModalBook from '../component/book/EditBookModal';

const Book = () => {
    let nameRef = useRef();
    const { state } = useContext(AuthContext);
    const [books, setBooks] = useState([])
    const [tableHeadings, setTableHeadings] = useState(null)
    const [searchedBook, setSearchedBook] = useState(null)
    const [assignedBooks, setAsssignedBooks] = useState([]);
    const [closeCard, setCloseCard] = useState(true)
    const [modalShow, setModalShow] = useState(false);
    const [bookId, setBookId] = useState(null)
    let navigate = useNavigate();

   

    useEffect(() => {
        checkAssignBook(state.token)
            .then((res) => {
                // setAsssignedBooks(updatedBooks => [...updatedBooks, {status: 'ASSIGNED'}])
                setAsssignedBooks(res.data.books)
            })
            .catch((err) => {
                throw err;
            })
    }, [state.token])

  

    const searchBooks = () => {
        let name = nameRef.current.value;
        searchBook(state.token, name)
            .then((res) => {
                setSearchedBook(res.data.data);
            })
        nameRef.current.value = '';
        
    }
    const closeButton = () => {
        setCloseCard(false);
        setCloseCard(true);
        setSearchedBook(null);
    }

    const borrowBookHandler = (id) => {
        borrowBook(id, state.token)
            .then(res => {
                const updatedBooks = books.map(book => {
                    if (book._id === id) {
                        return {
                            ...book,
                            status: 'ASSIGNED'
                        }
                    }
                    return book
                })
                setAsssignedBooks(prevState => [...prevState, res.data.data])
                setBooks(updatedBooks);
                toast.success('Borrowed book successfully !')
            })
            .catch((err) => {
                toast.error('Book was not borrowed !');
            })
    }
    const returnBookHandler = (id) => {
        returnBook(id, state.token)
            .then(res => {
                const updatedBooks = books.map(book => {
                    if (book._id === id) {
                        return {
                            ...book,
                            status: 'AVAILABLE'
                        }
                    }
                    return book
                })
                setAsssignedBooks(prevAssignedBooks => prevAssignedBooks.filter(({ _id }) => _id !== res.data.data));
                setBooks(updatedBooks);
                toast.success('Returned book successfully !')
            })
            .catch((err) => {
                toast.error('Book was not returned !');
            })
    }
    const deleteBookHandler = (id) => {
        deleteBook(id, state.token)
            .then(res => {
                console.log(res)
                setBooks(books => books.filter(({ id }) => id !== res.data.id));
                toast.success('Book deleted successfully !')
            })
            .catch((err) => {
                toast.error('Book was not returned !');
            })
    }

    const changeAssigne = (bookId, status) => {
        assigneChange(bookId, status, state.token)
            .then(res => {
                const updatedBooks = books.map(book => {
                    if (book._id === bookId && book.status === 'AVAILABLE') {
                        return {
                            ...book,
                            status: 'ASSIGNED'
                        }
                    } else if (book._id === bookId && book.status === 'ASSIGNED') {
                        return {
                            ...book,
                            status: 'AVAILABLE'
                        }
                    }
                    return book
                })
                setBooks(updatedBooks);
                toast.success('Book status changed successfully !')
            })
            .catch((err) => {
                toast.error('Book was not assigned !');
            })
    }

    useEffect(() => {
        if (!state.token) {
            return navigate('/')
        }
        getBooks(state.token)
            .then((res) => {
                if (res.status === 200) {
                    setBooks(res.data.data);
                    const book = res.data.data[0]
                    const tableHeadings = Object.keys(book).filter(key => ["name", "category", "status"].includes(key));
                    setTableHeadings(tableHeadings);
                }
            })
            .catch((err) => {
                throw err;
            })
    }, [navigate, state.token]);
    if (books.length === 0) {
        return (
        <>
            <NavMenu />
            <div style={{marginTop: '10vh', fontWeight: 'bold', fontSize: '24px'}}> No books available</div>
            <Footer />
         </>
        )
        
    }
   

    return (
        <>
            <NavMenu />
            <div className='container' style={{padding: '30px'}}>
                <Table responsive style={{ marginTop: '10vh', fontSize: '25px' }}>
                    <thead style={{ textAlign: 'center' }}>
                        <tr >
                            <th>sno.</th>
                            {tableHeadings.map((tableHeading) => (
                                <th key={tableHeading}>{tableHeading}</th>
                            ))}
                            
                            {state.role === 'ADMIN' ?
                            <>
                                <th>change status</th>
                                <th>edit</th>
                                <th>delete</th>
                            </>
                            : null
                            }
                            
                            {state.role === 'STUDENT' ?
                                <>
                                    <th>borrow</th>
                                    <th>return</th>
                                </>
                                : null
                            }
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {books.map((book, index) => (
                            <tr key={book._id}>
                                <td >{index + 1}</td>
                                <td>{book.name}  </td>
                                <td>{book.category}</td>
                                {
                                    book.status === 'AVAILABLE' ?
                                        <td style={{ color: 'green' }}>{book.status}</td>
                                        :
                                        <td style={{ color: 'red' }}>{book.status}</td>
                                }
                                {state.role === 'ADMIN' ?
                                    <td>
                                        {
                                            book.status === 'AVAILABLE' ?
                                                <OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={availableBookTooltip}
                                                >
                                                    <button style={{ border: 'none' }} onClick={event => { changeAssigne(book._id, 'ASSIGNED') }} >
                                                        <i className='far fa-arrow-alt-circle-up' style={{ fontSize: '24px' }}></i>
                                                    </button>
                                                </OverlayTrigger>
                                                :
                                                <OverlayTrigger
                                                    placement="top"
                                                    delay={{ show: 250, hide: 400 }}
                                                    overlay={assignedBookTooltip}
                                                >
                                                    <button style={{ border: 'none' }} onClick={event => { changeAssigne(book._id, 'AVAILABLE') }}>
                                                        <i className='far fa-arrow-alt-circle-down' style={{ fontSize: '24px' }}></i>
                                                    </button>
                                                </OverlayTrigger>
                                        }
                                    </td> : null
                                }

                                {state.role === 'ADMIN' ?
                                <>
                                     <td>
                                        
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={editBookTooltip}
                                        >
                                             <>
                                                <Button  variant="light" style={{border: 'none', backgroundColor: 'var(--bs-body-color)', color: 'white'}} onClick={(event) => {
                                                    setModalShow(true);
                                                    setBookId(event.value);
                                                }}>
                                                     <i className='fas fa-edit' style={{ fontSize:'18px', color: 'green'}}></i>
                                                </Button>

                                                <EditModalBook
                                                    show={modalShow}
                                                    onHide={() => setModalShow(false)}
                                                    id={bookId}
                                                />
                                            </>
                                        </OverlayTrigger>
                                        
                                    </td>
                                     <td>
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={deleteBookTooltip}
                                        >
                                            <button style={{ border: 'none' }} onClick={event => {deleteBookHandler(book._id)}}>
                                                <i className='fas fa-trash-alt' style={{ fontSize:'18px', color: 'red'}}></i>
                                            </button>
                                        </OverlayTrigger>
                                        
                                    </td>
                                </>
                                    : null
                                }

                                {state.role === 'STUDENT' ?
                                    <>
                                        <td>
                                            {
                                                book.status === 'ASSIGNED' ?
                                                    <button style={{ border: 'none' }} disabled>
                                                        <i className='fas fa-book' style={{ fontSize: '24px' }}></i>
                                                    </button>
                                                    :
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={borrowTooltip}
                                                    >
                                                        <button style={{ border: 'none' }} onClick={event => { borrowBookHandler(book._id) }}>
                                                            <i className='fas fa-book' style={{ fontSize: '24px' }}></i>
                                                        </button>
                                                    </OverlayTrigger>
                                            }
                                        </td>
                                        <td>
                                            {
                                                book.status === 'AVAILABLE' ?
                                                    <button style={{ border: 'none' }} disabled>
                                                        <i className='fas fa-sign-out-alt' style={{ fontSize: '24px' }}></i>
                                                    </button>
                                                    :
                                                    <OverlayTrigger
                                                        placement="top"
                                                        delay={{ show: 250, hide: 400 }}
                                                        overlay={returnTooltip}
                                                    >
                                                        <button style={{ border: 'none' }} onClick={event => { returnBookHandler(book._id) }}>
                                                            <i className='fas fa-sign-out-alt' style={{ fontSize: '24px' }}></i>
                                                        </button>
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
                {
                    state.role === 'STUDENT' ?
                        <>
                            <Form className="d-flex" style={{ margin: '10px', width: '98.5%' }}>
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                    ref={nameRef}
                                />
                                <Button variant="outline-dark" onClick={searchBooks}>Search</Button>
                            </Form>
                            {
                                Array.isArray(searchedBook) && searchedBook.length !== 0 && closeCard === true ?
                                    <>
                                        <h2 style={{ marginTop: '30px', padding: '20px' }}><u>Searched Books details are below :</u></h2>
                                        <Card style={{ margin: '10px', width: '98.5%' }}>
                                            <Card.Header style={{fontSize: '25px', fontWeight: 'bold'}}>Book Details
                                                <button style={{ float: 'right', border: 'none', background: 'none' }} onClick={closeButton}>
                                                    <i className="fa fa-times-circle" style={{ fontSize: '28px', color: 'red' }}></i>
                                                </button>
                                            </Card.Header>
                                            <Card.Body style={{fontSize: '20px'}}>
                                                <Card.Text>
                                                    Name: {searchedBook[0].name}
                                                </Card.Text>
                                                <Card.Text>
                                                    Category: {searchedBook[0].category}
                                                </Card.Text>
                                                <Card.Text>
                                                    Status: {searchedBook[0].status}
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                        <div style={{marginTop: '10vh'}}>
                                        </div>
                                    </>
                                    :
                                    <>
                                    </>
                            }
                        </> : null
                }

                {assignedBooks.length > 0 ? <AssignedBook assigneBooks={assignedBooks} /> : null}
            </div>
            <Footer />
        </>
    )
};

export default Book;
