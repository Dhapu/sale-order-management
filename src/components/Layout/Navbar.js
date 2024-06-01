import React, { useState } from 'react';
import { Flex, Spacer, Button, useColorMode, Box, IconButton } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { useHistory, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

function Navbar({ onToggleTheme }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add your logout logic here (e.g., clear tokens, make API call, etc.)
    navigate('/login');
  };

  return (
    <Flex p={4} bg="gray.800" color="white" alignItems="center">
      <Box>Sale Order Management</Box>
      <Spacer />
      <Button onClick={toggleColorMode} mr={2}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
      <IconButton
        icon={<FiLogOut />}
        aria-label="Logout"
        onClick={() => setShowLogoutButton(!showLogoutButton)}
      />
      {showLogoutButton && (
        <Button onClick={handleLogout} ml={2}>
          Logout
        </Button>
      )}
    </Flex>
  );
}

export default Navbar;
