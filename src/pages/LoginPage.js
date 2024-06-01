import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Input, VStack } from "@chakra-ui/react";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = ({ username, password }) => {
    if (username === 'admin' && password === 'test@345') {
      localStorage.setItem('isAuthenticated', true);
      navigate('/sale-orders');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <Box w="100vw" h="100vh" display="flex" justifyContent="center" alignItems="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <Input placeholder="Username" {...register('username')} />
          <Input type="password" placeholder="Password" {...register('password')} />
          <Button type="submit">Login</Button>
        </VStack>
      </form>
    </Box>
  );
}

export default LoginPage;
