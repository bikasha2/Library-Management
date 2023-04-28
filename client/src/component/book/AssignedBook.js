import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { AuthContext } from '../../context/AuthContextProvider';
import { checkAssignBook } from '../../service/BookService';
import moment from 'moment'

function AssignedBook({assigneBooks}) {
    // const [books, setBooks] = useState([])
    // const {state} = useContext(AuthContext)
    // useEffect(()=> {
    //     checkAssignBook(state.token)
    //     .then((res) => {
    //         setBooks(res.data.books)
    //     })
    //     .catch((err) => {
    //         console.log(err)
    //     }) 
    // }, [])
    return (
        <>
        {assigneBooks.map((book) => (
            <Card key={book._id} style={{ margin: '10px', width: '98.5%'}}>
                <Card.Header>Book Details</Card.Header>
                <Card.Body>
                    <Card.Text>
                        Name: {book.name}
                    </Card.Text>
                    <Card.Text>
                        Category: {book.category}
                    </Card.Text>
                    <Card.Text>
                        Status: {book.status}
                    </Card.Text>
                    <Card.Text>
                        Borrowed on: {moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')}
                    </Card.Text>
                    
                </Card.Body>
            </Card>
        ))}
            
        </>
    )
}

export {
    AssignedBook,
    checkAssignBook,
}