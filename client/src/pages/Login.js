import React, { useContext, useRef, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import loginUser from '../service/AuthService';
import { AuthContext } from '../context/AuthContextProvider';
import { AUTH_REDUCER_ACTION } from '../reducer/AuthReducer';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const { state, dispatch } = useContext(AuthContext);
  const [loginIsInProgress, setLoginIsInProgress] = useState(false);
  if (state.token) {
    return <Navigate to='/books' replace />;
  }
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const emailId = emailRef.current.value;
    const password = passwordRef.current.value;
    setLoginIsInProgress(true);
    loginUser({ emailId, password })
      .then((res) => {
        sessionStorage.setItem('token', res.data.data.token);
        dispatch({
          type: AUTH_REDUCER_ACTION.LOGIN,
          payload: { ...res.data.data },
        });

        toast.success('Login Successfully.');
      })
      .catch((err) => {
        toast.error('Invalid Credentials');
      })
      .finally(() => {
        setLoginIsInProgress(false);
      });
    };
  return (
    <Card style={{ width: '58vh', height: '38vh', marginLeft: 'auto', marginRight: 'auto', marginTop: '30vh', boxShadow: 'rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px'}}>
      <Card.Body>
      <Form onSubmit={onSubmitHandler}>
                  <Form.Group className='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email</Form.Label>
                    <span className='text-danger fw-bold mx-1'>*</span>
                    <Form.Control
                      type='email'
                      placeholder='Email'
                      ref={emailRef}
                      name='emailId'
                      required
                      disabled={loginIsInProgress}
                    />
                  </Form.Group>
                  <Form.Group className='mb-3' controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <span className='text-danger fw-bold mx-1'>*</span>
                    <Form.Control
                      type='password'
                      placeholder='Password'
                      ref={passwordRef}
                      required
                      name='password'
                      disabled={loginIsInProgress}
                    />
                  </Form.Group>
                  <div className='text-center'>
                    <Button
                      variant='success'
                      type='submit'
                      disabled={loginIsInProgress}
                      style={{ marginTop: '4vh', height: '100% !important', width: '100% !important'}}
                    >
                      {loginIsInProgress ? <Spinner /> : 'Submit'}
                    </Button>
                  </div>
                </Form>
      </Card.Body>
    </Card>
  );
}

export default Login;