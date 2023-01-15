import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import { MDBDropdown, MDBDropdownMenu, MDBDropdownToggle, MDBDropdownItem } from 'mdb-react-ui-kit';
import '../Design/AppNavbar.css'
import logo from '../Images/logo.png'
import profile from '../Images/profile.jpg'
import UserContext from '../UserContext';
import { useContext, useEffect, useState } from 'react';

function AppNavbar() {
  const {currentUser} = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    console.log(process.env.SERVER_URL)
    if(currentUser.username !== null){
      setIsLogin(true)
    } else{
      setIsLogin(false)
    }
  }, [currentUser.username])


  const userAppNav = () =>{
    return (
      <MDBDropdown>
        <MDBDropdownToggle tag='a' className='btn userBtn'>
          <img className='profileNav' src={profile}/>@{currentUser.username}
        </MDBDropdownToggle>
        <MDBDropdownMenu>
          <MDBDropdownItem link href='/account'>Account</MDBDropdownItem>
          <MDBDropdownItem link href='/settings'>Setting</MDBDropdownItem>
          <MDBDropdownItem link href='/logout'>Logout</MDBDropdownItem>
        </MDBDropdownMenu>
    </MDBDropdown>
    )
  }

  return (
    <Navbar className='nav' expand="lg" style={{backgroundColor: "#3D8361"}}>
      <Container >
        <Navbar.Brand href="/home"><img className='logo' src={logo} alt='...'/></Navbar.Brand>
        {(isLogin ? userAppNav(): <Button href='/login' className='signUpBtn'>Login/Register</Button>)}
          {/* <Button href='/login' className='signUpBtn'>Login/Register</Button> */}
        {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}

export default AppNavbar;