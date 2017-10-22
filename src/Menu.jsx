import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

export default () => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Invoice App</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to="/">
          <NavItem eventKey={2}>Invoices</NavItem>
        </LinkContainer>
        <LinkContainer to="/customers">
          <NavItem eventKey={2}>Customers</NavItem>
        </LinkContainer>
        <LinkContainer to="/products">
          <NavItem eventKey={1}>Products</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  </div>
);
