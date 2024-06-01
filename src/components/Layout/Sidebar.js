import React from 'react';
import { Box, VStack, Link, useColorMode, Button } from "@chakra-ui/react";
import { Link as RouterLink } from 'react-router-dom';

function Sidebar() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box w="200px" bg={colorMode === 'light' ? 'gray.200' : 'gray.700'} p={4}>
      <VStack align="start">
        <Link as={RouterLink} to="/sale-orders">Sale Orders</Link>
        <Link as={RouterLink} to="/another-page">Another Page</Link>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </VStack>
    </Box>
  );
}

export default Sidebar;
