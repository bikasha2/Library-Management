import { useContext, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form'
import { AuthContext } from '../../context/AuthContextProvider';
import { searchBook } from '../../service/BookService';
import Button from 'react-bootstrap/Button';

const BookSearch = () => {
    const nameRef = useRef();
    const { state } = useContext(AuthContext);
    const [searchedBook, setSearchedBook] = useState(null)
    const searchBooks = () => {
        const name = nameRef.current.value;
        searchBook(state.token, name)
        .then((res) => {
            console.log(res.data);
            setSearchedBook(res.data)
        })
    }
    return(
        <>
            <Form className="d-flex" style={{ margin: '10px', width: '98.5%'}}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    ref={nameRef}
                />
                <Button variant="outline-dark" onClick={searchBooks}>Search</Button>
            </Form>
            <Card  style={{ margin: '10px', width: '98.5%'}}>
                <Card.Header>Book Details</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Name: {searchedBook.name}
                    </Card.Text>
                    <Card.Text>
                        Category: {searchedBook.category}
                    </Card.Text>
                    <Card.Text>
                        Status: {searchedBook.status}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default BookSearch;