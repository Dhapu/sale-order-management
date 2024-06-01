import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, VStack } from "@chakra-ui/react";

function LoginForm({ onSubmit }) {
  const { register, handleSubmit } = useForm();

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

export default LoginForm;
