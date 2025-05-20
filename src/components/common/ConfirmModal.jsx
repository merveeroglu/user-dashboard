// components/ConfirmDialog.js
import React, { useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, title, message, onConfirm, onCancel, autoClose = false }) => {

   useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        if (onConfirm) onConfirm(); 
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [show, autoClose, onConfirm]);
  return (
    <Modal show={show} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title || "Onay"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message || "Bu işlemi onaylıyor musunuz?"}</Modal.Body>
      {!autoClose &&
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Vazgeç 
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Onayla
        </Button>
      </Modal.Footer>}
    </Modal>
  );
};

export default ConfirmModal;
