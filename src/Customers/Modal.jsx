import React from 'react';
import { Modal, Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

import FieldGroup from './FieldGroup';
import { createUser } from './../api';

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      address: '',
      newUser: true
     };
     this.inputHandler = this.inputHandler.bind(this);
     this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== null) {
      fetch(`/api/customers/${nextProps.id}`).then(r => r.json())
        .then(({ name, phone, address }) => this.setState({ name, phone, address, newUser: false }))
    } else {
      this.setState({ name: '', phone: '', address: '', newUser: true })
    }
  }

  inputHandler({ target }) {
    this.setState({ [target.name]: target.value })
  }

  submit() {
    if (this.state.newUser) {
      const { name, phone, address } = this.state;
      createUser(name, phone, address)
        .then(this.props.close)
    }
  }

  render() {
    const header = !this.state.newUser? 'Информация о пользователе' : 'Создание пользователя';
    const finish = !this.state.newUser? 'Сохранить' : 'Создать';
    return (
      <Modal show={this.props.isOpen} onHide={this.props.close}>
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
          <Button onClick={this.submit} >{ finish }</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
