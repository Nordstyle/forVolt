import React from 'react';
import { Table, PageHeader } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import Grid from './../Grid';
import Modal from './Modal';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
      modalIsOpen: false,
      selectedId: null
    };
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch('/api/customers').then(r => r.json())
      .then(customers => this.setState({ customers }))
  }

  modalOpen(e, selectedId=null) {
    this.setState({ modalIsOpen: true, selectedId })
  }

  modalClose() {
    this.setState({ modalIsOpen: false });
    this.getData();
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.modalIsOpen} id={this.state.selectedId} close={this.modalClose} />
        <Grid>
          <PageHeader>Customer List&nbsp;
              <Button onClick={this.modalOpen} >Create</Button>
          </PageHeader>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.customers.map(({ name, address, phone, id }, i) => (
                  <tr key={id} onClick={e => this.modalOpen(e, id)}>
                    <td>{ i + 1 }</td>
                    <td>{ name }</td>
                    <td>{ address }</td>
                    <td>{ phone }</td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </Grid>
      </div>
    )
  }
};
