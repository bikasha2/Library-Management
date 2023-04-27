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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
      <Container>
        <Navbar.Brand>Library Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          </Nav>
          <Nav>
            {/* <Navbar.Brand>Hi ! {state.emailId}</Navbar.Brand>
            <Navbar.Brand>({state.role})</Navbar.Brand> */}
            {state.role === "ADMIN" ? BookModal() : null}
            <Nav.Link href="/" onClick={logOut}>LogOut</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;