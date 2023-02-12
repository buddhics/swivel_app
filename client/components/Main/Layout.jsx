import { Navbar, Container } from 'react-bootstrap';
import classes from './Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Navbar  className={classes.header}>
        <Container>
          <Navbar.Brand href="#home"><strong>Employee Management</strong></Navbar.Brand>
        </Container>
      </Navbar>
      <main>{children}</main>
    </>
  );
}
