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
              <Navbar.Text>
                  <Navbar.Link href="https://github.com/williamliu52/react-stocks" target="_blank">View Github</Navbar.Link>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}

export default Header;
