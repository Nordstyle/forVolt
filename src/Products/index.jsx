import React from 'react';
import { Table, PageHeader } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

import { getProducts } from './../api';
import Grid from './../Grid';
import Modal from './Modal';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      modalIsOpen: false,
      selectedId: null
    };
    this.modalOpen = this.modalOpen.bind(this);
    this.modalClose = this.modalClose.bind(this);
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
    document.title = 'Products Page'
  }

  getData() {
    getProducts()
      .then(products => this.setState({ products }))
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
        <Modal key={this.state.selectedId} isOpen={this.state.modalIsOpen} id={this.state.selectedId} close={this.modalClose} />
        <Grid>
          <PageHeader>Products List&nbsp;
              <Button onClick={this.modalOpen} >Create</Button>
          </PageHeader>
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.products.map(({ name, price, id }, i) => (
                  <tr key={id} onClick={e => this.modalOpen(e, id)}>
                    <td>{ i + 1 }</td>
                    <td>{ name }</td>
                    <td>{ price }</td>
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
