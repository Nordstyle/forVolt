import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default ({ isOpen, header, text, onHide, onSuccess }) => (
  <Modal show={isOpen} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>{ header }</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      { text }
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onSuccess} bsStyle="danger">Да</Button>
      <Button onClick={onHide}>Нет</Button>
    </Modal.Footer>
  </Modal>
);
