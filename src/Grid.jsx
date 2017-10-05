import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default ({ children }) => (
  <Grid>
    <Row>
      <Col md={12}>{ children }</Col>
    </Row>
  </Grid>
);
