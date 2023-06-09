import React, { useContext, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContextProvider';
import { addBook } from '../../service/BookService';

function ModalBook(props) {
    const nameRef = useRef();
    const categoryRef = useRef();
    const [bookIsInProgress, setBookIsInProgress] = useState(false);
    const { state } = useContext(AuthContext);
    const submitHandler = (event) => {
        event.preventDefault();
        let name = nameRef.current.value;
        let category = categoryRef.current.value;
    setBookIsInProgress(true);
        addBook(name, category, state.token)
            .then((res) => {
            props.cb(res.data.data)
            toast.success('Book Added Successfully !');
        })
        .catch((err) => {
            toast.error('Book was not added !');
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
                    Add Book
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
                      required
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
                      required
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

const BookModal = ({cb}) => {
    const [modalShow, setModalShow] = React.useState(false);
   
    return (
        <>
            <Button variant="light" style={{border: 'none', backgroundColor: 'var(--bs-body-color)', color: 'white'}} onClick={() => {
                setModalShow(true);
            }}>
                <span style={{fontSize: '22px'}}>AddBook</span>
            </Button>

            <ModalBook
                show={modalShow}
                onHide={() => setModalShow(false)}
                cb={cb}
            />
        </>
    )
}

export default BookModal;

