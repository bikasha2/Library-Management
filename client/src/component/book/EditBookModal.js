import React, { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContextProvider';
import { editBook } from '../../service/BookService';

function EditModalBook(props) {
   const {id} = props;
    const nameRef = useRef();
    const categoryRef = useRef();
    const [bookIsInProgress, setBookIsInProgress] = useState(false);
    const { state } = useContext(AuthContext);
    const submitHandler = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const category = categoryRef.current.value;
        setBookIsInProgress(true);
        editBook(id, name, category, state.token)
            .then((res) => {
            // setBooks(prevState => [...prevState, res.data.data])
            toast.success('Book Updateed Successfully !');
        })
        .catch((err) => {
            toast.error('Book was not updated !');
        })
        .finally(() => {
            setBookIsInProgress(false);
        });
        nameRef.current.value = '';
        categoryRef.current.value = '';
    };
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
             <Form  onSubmit={submitHandler}>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter" style={{fontWeight: 'bold'}}>
                    Edit Book
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Name</Form.Label>
                    <span className='text-danger fw-bold mx-1'>*</span>
                    <Form.Control
                      type='text'
                      placeholder='Name'
                      ref={nameRef}
                      name='emailId'
                     
                      disabled={bookIsInProgress}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Category</Form.Label>
                    <span className='text-danger fw-bold mx-1'>*</span>
                    <Form.Control
                      type='text'
                      placeholder='Category'
                      ref={categoryRef}
                      
                      name='category'
                      disabled={bookIsInProgress}
                    />
                  </Form.Group>
                  <div className='text-center'>
                   
                  </div>
                
            </Modal.Body>
            <Modal.Footer>
            <Button
                      variant='success'
                      type='submit'
                      disabled={bookIsInProgress}
                      style={{height: '100% !important', minWidth: '6rem' }}
                    >
                      {bookIsInProgress ? <Spinner animation="grow" size='sm'/> : 'Submit'}
                    </Button>
            </Modal.Footer>
            </Form>
        </Modal>
    );
}



export default EditModalBook;

