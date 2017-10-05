import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Route, Switch, Redirect } from 'react-router-dom';

import Menu from './Menu';
import Customers from './Customers';
import Products from './Products';

export default () => (
  <div>
    <Menu />
    <Switch>
      <Route exact path="/" render={()=><div>Root</div>} />
      <Route path="/products" component={Products} />
      <Route path="/customers" component={Customers} />
      <Route path="*" render={() => <Redirect to="/" />} />
    </Switch>
  </div>
);
