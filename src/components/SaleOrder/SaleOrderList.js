import React, { useState, useEffect } from 'react';
import { Box, Button, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import SaleOrderModal from './SaleOrderModal';

function SaleOrderList({ status, newSaleOrderData, setNewSaleOrderData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleEditClick = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };

  const handleSave = (updatedOrder) => {
    const index = newSaleOrderData.findIndex(item => item.id === updatedOrder.id);
  if (index !== -1) {
    const updatedOrders = [...newSaleOrderData];
    updatedOrders[index] = updatedOrder;
    setNewSaleOrderData(updatedOrders);
    localStorage.setItem('saleOrderData', JSON.stringify(updatedOrders));
  }
  setModalOpen(false);
    // const updatedOrders = newSaleOrderData.map(order => {
    //   if (order.invoice_no === updatedOrder.invoice_no) {
    //     return updatedOrder;
    //   } else {
    //     return order;
    //   }
    // });
    // setNewSaleOrderData(updatedOrders);
    //setModalOpen(false);
    // Save updated data to localStorage
    
  };

  const filteredOrders = newSaleOrderData.filter(order => {
    if (status === 'active') {
      return !order.paid; // Return orders where paid is false for active tab
    } else {
      return order.paid; // Return orders where paid is true for completed tab
    }
  });

  return (
    <Box>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Invoice No</Th>
            <Th>Customer Name</Th>
            <Th>Price</Th>
            <Th>Invoice Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredOrders.map(order => (
            <Tr key={order.id}>
              <Td>{order.invoice_no}</Td>
              <Td>{order.customer_name}</Td>
              <Td>{order.total_price}</Td>
              <Td>{order.invoice_date}</Td>
              <Td>
                <Button onClick={() => handleEditClick(order)}>Edit</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <SaleOrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        order={selectedOrder}
        onSave={handleSave}
      />
    </Box>
  );
}

export default SaleOrderList;