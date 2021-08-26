import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import { 
  Input, 
  Menu,  
  Dropdown,
  Image,
  Icon
} from 'semantic-ui-react';
import Auth from '../utils/auth';
import logo from '../Images/PocketChef-image.jpg';

const AppNavbar = () => {
    // set modal display state
    const [showModal, setShowModal] = useState(false);
  
    return (
        <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Recipes Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                Search For Recipes
              </Nav.Link>
              {/* if user is logged in show saved Recipes and logout */}
              {Auth.loggedIn() ? (
                <>
                  <Nav.Link as={Link} to='/saved'>
                    See Your Recipes
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
        

      <Image centered src={logo} size={'medium'}/>
          <Menu inverted>
          <Link to="/">   
            <Menu.Item
              icon='home'
              name='home'
            />  
          </Link> 
                <Dropdown item text='Recipes'>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link to="/SearchRecipe">
                            <font color ={'black'}><Icon fitted name='search'/>Search Recipe</font>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/SavedRecipe">
                            <font color ={'black'}><Icon fitted name='bookmark outline'/>Saved Recipe</font>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/CreateRecipe">
                            <font color ={'black'}><Icon fitted name='pen square'/>Create Recipe</font>
                        </Link></Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            <Menu.Menu position='right'>
              <Menu.Item>
                <Input icon='search' placeholder='Search Recipe...' />
              </Menu.Item>
              <Dropdown item text='Account'>
                <Dropdown.Menu>
                    <Dropdown.Item>
                        <Link to="/Profile">
                            <font color ={'black'}><Icon fitted name='user outline'/>Profile</font>
                        </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                        <Link to="/Login">
                            <font color ={'black'}><Icon fitted name='sign out alternate'/>Logout</font>
                        </Link>
                    </Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
          </Menu>


    </>
    );
};

export default AppNavbar;