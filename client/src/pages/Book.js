import React, { useContext, useEffect, useRef, useState } from 'react'
import NavMenu from '../component/navigation/NavMenu';
import { AuthContext } from '../context/AuthContextProvider';
import { borrowBook, checkAssignBook, getBooks, returnBook } from '../service/BookService';
import Table from 'react-bootstrap/Table';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { AssignedBook } from '../component/book/AssignedBook';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import { searchBook } from '../service/BookService';
import Card from 'react-bootstrap/Card';

const Book = () => {
    const nameRef = useRef();
    const { state } = useContext(AuthContext);
    const [books, setBooks] = useState([])
    const [tableHeadings, setTableHeadings] = useState(null)
    const [searchedBook, setSearchedBook] = useState(null)
    const [assignedBooks, setAsssignedBooks] = useState([]);
    let navigate = useNavigate();
    const borrowTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click to borrow a book
        </Tooltip>
    );
    const returnTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Click to return a book
        </Tooltip>
    );

    useEffect(() => {
        checkAssignBook(state.token)
            .then((res) => {
                setAsssignedBooks(res.data.books)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])



    const searchBooks = () => {
        const name = nameRef.current.value;
        searchBook(state.token, name)
            .then((res) => {

                setSearchedBook(res.data.data)


            })
    }

    console.log(searchedBook);

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
                // AssignedBook()
                toast.success('Borrowed book successfully !')
            })
            .catch((err) => {
                toast.error('Book was not borrowed !');
            })


    }
    const returnBookHandler = (id) => {
        returnBook(id, state.token)
            .then(res => {
                console.log(res)
                const updatedBooks = books.map(book => {
                    if (book._id === id) {
                        return {
                            ...book,
                            status: 'AVAILABLE'
                        }
                    }
                    return book
                })
                console.log(assignedBooks)
                setAsssignedBooks(prevAssignedBooks => prevAssignedBooks.filter(({ _id }) => _id !== res.data.data));
                setBooks(updatedBooks);
                // AssignedBook()
                toast.success('Returned book successfully !')
            })
            .catch((err) => {
                toast.error('Book was not returned !');
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
                console.log(err)
            })
    }, []);
    if (books.length === 0) {
        return <div style={{ display: 'flex', justifyContent: 'center', marginTop: '35vh' }}><Spinner /> </div>
    }

    return (
        <>
            <NavMenu />


            <Table responsive style={{ marginTop: '10vh' }}>
                <thead style={{ textAlign: 'center' }}>
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
                <tbody style={{ textAlign: 'center' }}>
                    {books.map((book, index) => (
                        <tr key={book._id}>
                            <td >{index + 1}</td>
                            <td>{book.name}  </td>
                            <td>{book.category}</td>
                            <td>{book.status}</td>
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
                Array.isArray(searchedBook) && searchedBook.length !== 0 ?
                    <Card style={{ margin: '10px', width: '98.5%' }}>
                        <Card.Header>Book Details</Card.Header>
                        <Card.Body>
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
                    : <></>
            }

            {assignedBooks.length > 0 ? <AssignedBook assigneBooks={assignedBooks} /> : null}
        </>
    )
};

export default Book;
