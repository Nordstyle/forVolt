import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import FieldGroup from '../FieldGroup';
import { createProduct, editProduct, getProduct, deleteProduct } from './../api';
import Confirmation from './../Confirmation';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      price: '',
      newProduct: true,
      confirmationIsOpen: false
     };
     this.inputHandler = this.inputHandler.bind(this);
     this.submit = this.submit.bind(this);
     this.deleteProduct = this.deleteProduct.bind(this);
     this.openConfirmation = this.openConfirmation.bind(this);
     this.closeConfirmation = this.closeConfirmation.bind(this);
  }

  componentDidMount() {
    this.props.id &&
    getProduct(this.props.id)
      .then(({ name, price }) => this.setState({ name, price, newProduct: false }))
  }

  inputHandler({ target }) {
    this.setState({ [target.name]: target.value })
  }

  submit() {
    const { name, price } = this.state;
    (this.state.newProduct
      ? createProduct(name, price)
      : editProduct(this.props.id, name, price)
    ).then(this.props.close)
  }

  openConfirmation() {
    this.setState({ confirmationIsOpen: true })
  }

  closeConfirmation() {
    this.setState({ confirmationIsOpen: false })
  }

  deleteProduct() {
    deleteProduct(this.props.id)
      .then(this.closeConfirmation)
      .then(this.props.close)
  }

  render() {
    const header = this.props.id? 'Информация о продукте' : 'Создание продукта';
    const finish = this.props.id? 'Сохранить' : 'Создать';
    return (
      <Modal show={this.props.isOpen} onHide={this.props.close}>
        <Confirmation
          isOpen={this.state.confirmationIsOpen}
          header="Предупреждение"
          text="Вы действительно хотите удалить пользователя?"
          onHide={this.closeConfirmation}
          onSuccess={this.deleteProduct} />
        <Modal.Header closeButton>
          <Modal.Title>{ header }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FieldGroup label="Name" name="name" type="text" value={this.state.name} onInput={this.inputHandler} />
          <FieldGroup label="Price" name="price" type="text" value={this.state.price} onInput={this.inputHandler} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Закрыть</Button>
          <Button onClick={this.submit} bsStyle="success" >{ finish }</Button>
          { !this.state.newProduct && <Button onClick={this.openConfirmation} bsStyle="danger">Удалить</Button> }
        </Modal.Footer>
      </Modal>
    )
  }
}
