import React from 'react';
import {
  Table,
  PageHeader,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';
import Select from 'react-select';
import { Redirect } from 'react-router-dom'

import Grid from './../Grid';
import FieldGroup from './../FieldGroup';
import Confirmation from './../Confirmation';
import {
  getUsers,
  getProducts,
  createInvoice,
  createInvoiceItem,
  getUser,
  getInvoice,
  getInvoiceItems,
  deleteInvoice
} from './../api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      discount: 0,
      customerId: null,
      selectedProductId: null,
      customers: [],
      products: [],
      addedProducts: [],
      newInvoice: true,
      confirmationIsOpen: false
    };
    this.getCustomers = this.getCustomers.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.changeQuantity = this.changeQuantity.bind(this);
    this.createInvoice = this.createInvoice.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.deleteInvoice = this.deleteInvoice.bind(this);
    this.openConfirmation = this.openConfirmation.bind(this);
    this.closeConfirmation = this.closeConfirmation.bind(this);
  }

  componentDidMount() {
    this.getCustomers();
    this.getProducts();
    if (this.props.match.params.id) {
      this.getCustomer()
    }
  }

  getCustomers() {
    getUsers().then(customers => this.setState({ customers }))
  }

  async getCustomer() {
    const id = this.props.match.params.id;
    const items = await getInvoiceItems(id);
    const invoice = await getInvoice(id);
    this.setState({
      discount: invoice.discount,
      customerId: invoice.customer_id,
      newInvoice: false,
      addedProducts: items.map(({ product_id, quantity }) => ({ id: product_id, qty: quantity }))
    })
  }

  getProducts() {
    getProducts().then(products => this.setState({ products }))
  }

  addProduct() {
    if (this.state.selectedProductId === null) return null;
    this.setState(prevState => ({
      addedProducts: [...prevState.addedProducts, { id: this.state.selectedProductId, qty: 0 }]
    }))
  }

  changeQuantity(event, id) {
    const addedProducts = [...this.state.addedProducts];
    addedProducts.find(p => p.id === id).qty = event.target.value;
    this.setState({ addedProducts })
  }

  deleteItem(id) {
    this.setState( prevState => ({
      addedProducts: prevState.addedProducts.filter(p => p.id !== id)
    }))
  }

  deleteInvoice() {
    deleteInvoice(this.props.match.params.id)
      .then(_=> this.props.history.push('/'))
  }

  createInvoice() {
    createInvoice(this.state.customerId, this.state.discount, this.total)
      .then(({id:invoice_id}) => Promise.all(this.state.addedProducts.map(({id, qty}) => createInvoiceItem(invoice_id, id, qty)))
        .then(_=>this.props.history.push('/'))
      )
  }

  openConfirmation() {
    this.setState({ confirmationIsOpen: true })
  }

  closeConfirmation() {
    this.setState({ confirmationIsOpen: false })
  }

  render() {
    this.total = this.state.addedProducts.reduce((a,c) => {
      const currentProduct = this.state.products.find(p => p.id === c.id);
      const price = ((currentProduct && currentProduct.price) || 0) * c.qty;
      return a + price
    },0)

    const customersOptions = this.state.customers.map(({ id, name }) => ({ value: id, label: name }));

    const productsOptions = this.state.products
      .map(({ id, name }) => ({ value: id, label: name }))
      .filter(({ value }) => !this.state.addedProducts.find(({ id }) => id === value ));
    return (
      <Grid>
        <Confirmation
          header="Warning"
          text="Элемент будет удален. Продолжить?"
          isOpen={this.state.confirmationIsOpen}
          onHide={this.closeConfirmation}
          onSuccess={this.deleteInvoice}
        />
        <PageHeader>
          { this.state.newInvoice? 'Create' : 'Edit' } Invoice
        </PageHeader>
        <div style={{ width: '300px' }}>
          <FieldGroup
            label="Discount (%)"
            type="number"
            min="0"
            max="100"
            value={this.state.discount}
            onChange={(e) => this.setState({ discount: e.target.value})}
          />
          <FormGroup>
            <ControlLabel>Customer</ControlLabel>
            <Select
              disabled={!this.state.newInvoice}
              value={this.state.customerId}
              options={customersOptions}
              onChange={({ value }) => this.setState({ customerId: value })}
            />
          </FormGroup>
        </div>
        <FormGroup>
          <ControlLabel>Add Product</ControlLabel>
          <div style={{ display: 'flex' }}>
            <Select
              disabled={!this.state.customerId}
              value={this.state.selectedProductId}
              options={productsOptions}
              onChange={({ value }) => this.setState({ selectedProductId: value })}
              style={{ width: '300px' }}
            />&nbsp;
            <Button onClick={this.addProduct}>Add</Button>
          </div>
        </FormGroup>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.products.length > 0 && this.state.addedProducts.map(({ id, qty }) => {
                const currentProduct = this.state.products.find(product => product.id === id);
                if (!currentProduct) return null;
                return (
                  <tr key={id}>
                    <td>{ currentProduct.name }</td>
                    <td>{ currentProduct.price }</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FormControl
                          type="number"
                          value={qty}
                          style={{ width: '150px' }}
                          onChange={e => this.changeQuantity(e, id)}
                        />&nbsp;
                        <Button
                          bsStyle="danger"
                          bsSize="xsmall"
                          onClick={() => this.deleteItem(id)}
                        >Delete</Button>
                      </div>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
        <PageHeader>
          Total: { (this.total - this.total * (this.state.discount / 100)).toFixed(2) }
        </PageHeader>
        <Button
          disabled={this.total === 0}
          onClick={this.createInvoice}
        >{ this.state.newInvoice? 'Create' : 'Save' }</Button>&nbsp;
        {
          !this.state.newInvoice && (
            <Button
              onClick={this.openConfirmation}
              bsStyle="danger"
            >Delete</Button>
          )
        }
      </Grid>
    )
  }
}
