import React, { useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";

function SaleOrderModal({ isOpen, onClose, order, onSave }) {
  const [editedOrder, setEditedOrder] = useState({});

  useEffect(() => {
    if (order) {
      setEditedOrder(order);
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder(prevOrder => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedOrder);
    onClose(); // Close the modal after saving
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id='invoice_no'>
            <FormLabel>Invoice Number</FormLabel>
            <Input name="invoice_no" value={editedOrder.invoice_no || ''} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4} id='customer'>
            <FormLabel>Customer Name</FormLabel>
            <Input name="customer_name" value={editedOrder.customer_name || ''} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4} id='price'>
            <FormLabel>Price</FormLabel>
            <Input name="total_price" value={editedOrder.total_price || ''} onChange={handleChange} />
          </FormControl>
          <FormControl mt={4} id='invoice_date'>
            <FormLabel>Invoice Date</FormLabel>
            <Input name="invoice_date" value={editedOrder.invoice_date || ''} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SaleOrderModal;
