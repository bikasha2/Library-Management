import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import BookModal from '../../component/book/BookModal'
import { AuthContext } from '../../context/AuthContextProvider';
import { AUTH_REDUCER_ACTION } from '../../reducer/AuthReducer';

function NavMenu() {
    const { state, dispatch } = useContext(AuthContext);
    const logOut = () => {
        sessionStorage.clear('token');
        dispatch({
            type: AUTH_REDUCER_ACTION.LOGOUT,
        });
    }
    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
                <Container>
                    <Navbar.Brand style={{ fontSize: '25px', float: 'left'}}>Library Management System</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav >
                            {state.role === "ADMIN" ? BookModal() : null}
                        </Nav>
                        <Nav>
                           
                            {state.token ?
                            <>
                                <Navbar.Brand>({state.role})</Navbar.Brand>
                            </>
                            : null }
                        </Nav>
                        <Nav>
                            {state.token ?
                                <Nav.Link style={{ fontSize: '20px' }} href="/" onClick={logOut}>LogOut</Nav.Link> : null
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
           
        </>
    );
}

export default NavMenu;