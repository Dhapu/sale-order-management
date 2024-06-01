import React, { useState } from 'react';
import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from '@chakra-ui/react';
import CustomerForm from './CustomerForm';
import SaleOrderForm from './SaleOrderForm';
import ConfirmationForm from './ConfirmationForm';

const MultiStepForm = ({ isOpen, onClose, onSave }) => {
  const [step, setStep] = useState(1);
  const [customerData, setCustomerData] = useState(null);
  const [saleOrderData, setSaleOrderData] = useState([]);

  const handleNextCustomer = (data) => {
    setCustomerData(data);
    setStep(2);
  };

  const handleNextSaleOrder = (data) => {
    setSaleOrderData(data);
    setStep(3);
  };

  const handleFinalSubmit = (data) => {
    const totalPrice = saleOrderData.reduce((total, item) => total + (parseInt(item.selling_rate, 10) * parseInt(item.total_items, 10)), 0);
    
    const finalData = {
      customer_name: customerData.name,
      customer_email: customerData.email,
      customer_id: customerData.id,
      items: saleOrderData.map((order) => ({
        sku_id: order.sku,
        price: parseInt(order.selling_rate, 10), // ensure selling_rate is a number
        quantity: parseInt(order.total_items, 10), // ensure total_items is a number
      })),
      total_price: totalPrice,
      paid: data.paid || false,
      invoice_no: data.invoice_no,
      invoice_date: data.invoice_date,
    };

    console.log('Final Data:', finalData);
    console.log('Sale Order Data:', saleOrderData);
    onSave(finalData);
    onClose(); // Close the modal after submission
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Sale Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {step === 1 && <CustomerForm onNext={handleNextCustomer} />}
          {step === 2 && <SaleOrderForm onNext={handleNextSaleOrder} />}
          {step === 3 && <ConfirmationForm onSubmit={handleFinalSubmit} customerData={customerData} saleOrderData={saleOrderData} />}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MultiStepForm;
