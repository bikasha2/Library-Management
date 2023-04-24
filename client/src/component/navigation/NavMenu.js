import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContextProvider';
import { AUTH_REDUCER_ACTION } from '../../reducer/AuthReducer';
import styles from './NavMenu.module.css';

const NavMenu = ({ hideManageTicketMenu }) => {
  const location = useLocation();
  const { state, dispatch } = useContext(AuthContext);
  const logoutHandler = (event) => {
    sessionStorage.clear('token');
    dispatch({
      type: AUTH_REDUCER_ACTION.LOGOUT,
    });
  };
  return (
    <>
      <Nav className='bg-success justify-content-end text-white align-items-center py-2 px-4 justify-content-between'>
        <h1 className='fs-4'>Library Management System</h1>
        {!hideManageTicketMenu && !state.token ? (
          <Nav.Item className={`mx-2 ${styles['menu-item']}`}>
            <Link
              className='text-white text-decoration-none'
              to='/books'
            >
              Book
            </Link>
          </Nav.Item>
        ) : null}
        {location.pathname === '/login' ? (
          <Nav.Item className={`mx-2 ${styles['menu-item']}`}>
            <Link
              className='text-white text-decoration-none'
              to='/login'
              replace={true}
            >
              Login
            </Link>
          </Nav.Item>
        ) : null}
        {state.token ? (
             <Nav.Item
                className={`mx-2 ${styles['menu-item']}`}
                onClick={logoutHandler}
              >
               Sign Out
              </Nav.Item>
        ) : null}
      </Nav>
    </>
  );
};

export default NavMenu;
