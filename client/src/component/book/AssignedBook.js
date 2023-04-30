import React from 'react'
import Card from 'react-bootstrap/Card';
import { checkAssignBook } from '../../service/BookService';
import moment from 'moment'

function AssignedBook({assigneBooks}) {
    return (
        <>
        <h2 style={{marginTop: '30px', padding: '20px'}}><u>Assigned Books List are below :</u></h2>
        {assigneBooks.map((book) => (
            <Card key={book._id} style={{ margin: '10px', width: '98.5%'}}>
                <Card.Header style={{fontSize: '25px', fontWeight: 'bold'}}>Book Details</Card.Header>
                <Card.Body style={{fontSize: '20px'}}>
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
            <div style={{marginTop: '10vh'}}>
            </div>
        </>
    )
}

export {
    AssignedBook,
    checkAssignBook,
}