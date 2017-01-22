import React, { Component } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';

class Header extends Component {
    render() {
        return (
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                React Stocks
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
              <NavItem eventKey={1} href="https://github.com/williamliu52/react-stocks">View Github</NavItem>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}

export default Header;
