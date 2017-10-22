import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import 'react-select/dist/react-select.min.css'
import Root from './Root';

render(
  <Router>
    <Root />
  </Router>,
  document.getElementById('app-root')
);
