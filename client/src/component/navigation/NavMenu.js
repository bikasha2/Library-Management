import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavMenu() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
      <Container>
        <Navbar.Brand href="#home">Library Management System</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/addbook">Add Book</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/login">SignOut</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavMenu;