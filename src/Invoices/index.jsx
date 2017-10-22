import React from "react";
import { Table, PageHeader } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';

import Grid from "./../Grid";
import { getInvoices } from './../api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: []
    };
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
    document.title = "Customers Page";
  }

  getData() {
    getInvoices()
      .then(invoices => this.setState({ invoices }))
  }

  render() {
    return (
      <div>
        <Grid>
          <PageHeader>
            Invoice List&nbsp;
            <Link to="/invoices/new">
              <Button>Create</Button>
            </Link>
          </PageHeader>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Customer</th>
                <th>Discount</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.invoices.map(({ customer, discount, total, id }, i) => (
                <tr key={id}>
                  <td>{i + 1}</td>
                  <td>{customer}</td>
                  <td>{discount}</td>
                  <td>{(total - total * (discount / 100)).toFixed(2)}</td>
                  <td>
                    <Link to={`/invoices/${id}/edit`}>edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Grid>
      </div>
    );
  }
}
