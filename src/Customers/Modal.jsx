import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import FieldGroup from '../FieldGroup';
import { createUser, editUser, getUser, deleteUser } from './../api';
import Confirmation from './../Confirmation';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      address: '',
      newUser: true,
      confirmationIsOpen: false
     };
     this.inputHandler = this.inputHandler.bind(this);
     this.submit = this.submit.bind(this);
     this.deleteUser = this.deleteUser.bind(this);
     this.openConfirmation = this.openConfirmation.bind(this);
     this.closeConfirmation = this.closeConfirmation.bind(this);
  }

  componentDidMount() {
    this.props.id &&
    getUser(this.props.id)
      .then(({ name, phone, address }) => this.setState({ name, phone, address, newUser: false }))
  }

  inputHandler({ target }) {
    this.setState({ [target.name]: target.value })
  }

  submit() {
    const { name, phone, address } = this.state;
    (this.state.newUser
      ? createUser(name, phone, address)
      : editUser(this.props.id, name, phone, address)
    ).then(this.props.close)
  }

  openConfirmation() {
    this.setState({ confirmationIsOpen: true })
  }

  closeConfirmation() {
    this.setState({ confirmationIsOpen: false })
  }

  deleteUser() {
    deleteUser(this.props.id)
      .then(this.closeConfirmation)
      .then(this.props.close)
  }

  render() {
    const header = this.props.id? 'Информация о пользователе' : 'Создание пользователя';
    const finish = this.props.id? 'Сохранить' : 'Создать';
    return (
      <Modal show={this.props.isOpen} onHide={this.props.close}>
        <Confirmation
          isOpen={this.state.confirmationIsOpen}
          header="Предупреждение"
          text="Вы действительно хотите удалить пользователя?"
          onHide={this.closeConfirmation}
          onSuccess={this.deleteUser} />
        <Modal.Header closeButton>
          <Modal.Title>{ header }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FieldGroup label="Name" name="name" type="text" value={this.state.name} onInput={this.inputHandler} />
          <FieldGroup label="Address" name="address" type="text" value={this.state.address} onInput={this.inputHandler} />
          <FieldGroup label="Phone" name="phone" type="text" value={this.state.phone} onInput={this.inputHandler} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.close}>Закрыть</Button>
          <Button onClick={this.submit} bsStyle="success" >{ finish }</Button>
          { !this.state.newUser && <Button onClick={this.openConfirmation} bsStyle="danger">Удалить</Button> }
        </Modal.Footer>
      </Modal>
    )
  }
}
