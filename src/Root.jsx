import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';

import Menu from './Menu';
import Customers from './Customers';
import Products from './Products';
import Invoices from './Invoices';
import DetailPage from './Invoices/DetailPage';

export default () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Invoices} />
      <Route path="/products" component={Products} />
      <Route path="/customers" component={Customers} />
      <Route path="/invoices/new" component={DetailPage} />
      <Route path="/invoices/:id/edit" component={DetailPage} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  </div>
);
