import React, { useState } from 'react';
import { Box, Flex, Tabs, TabList, Tab, TabPanels, TabPanel, useColorMode, Button, Spacer } from "@chakra-ui/react";
import Sidebar from '../components/Layout/Sidebar';
import SaleOrderList from '../components/SaleOrder/SaleOrderList';
import Navbar from '../components/Layout/Navbar';
import SaleOrderForm from '../components/SaleOrder/SaleOrderForm';
import MultiStepForm from '../components/SaleOrder/MultiStepForm';
import { useEffect } from 'react';

function SaleOrderPage() {
  const { toggleColorMode } = useColorMode();
  const [modalOpen, setModalOpen] = useState(false);
  const [newSaleOrderData, setNewSaleOrderData] = useState([]);

  useEffect(() => {
    // Load data from localStorage on component mount
    const savedData = localStorage.getItem('saleOrderData');
    if (savedData) {
      setNewSaleOrderData(JSON.parse(savedData));
    }
  }, []);

  const handleSaveNewSaleOrder = (data) => {
    // Update newSaleOrderData by adding the new sale order to the list
    const updatedData = [...newSaleOrderData, data];
    setNewSaleOrderData(updatedData);
    // Save data to localStorage
    localStorage.setItem('saleOrderData', JSON.stringify(updatedData));
    setModalOpen(false);
  };

  return (
    <Flex>
      {/* <Sidebar /> */}
      <Box flex="1">
        <Navbar onToggleTheme={toggleColorMode} />
        <Box p={4}>
          <Tabs>
            <Flex alignItems="center">
              <TabList>
                <Tab>Active Sale Orders</Tab>
                <Tab>Completed Sale Orders</Tab>
              </TabList>
              <Spacer />
              <Button onClick={() => setModalOpen(true)}>+ Sale Order</Button>
            </Flex>
            <TabPanels>
              <TabPanel>
                <SaleOrderList status="active" newSaleOrderData={newSaleOrderData}  setNewSaleOrderData={setNewSaleOrderData}/>
              </TabPanel>
              <TabPanel>
                <SaleOrderList status="completed" newSaleOrderData={newSaleOrderData} setNewSaleOrderData={setNewSaleOrderData}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        {modalOpen && (
          <MultiStepForm
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSaveNewSaleOrder}
          />
        )}
      </Box>
    </Flex>
  );
}

export default SaleOrderPage;
