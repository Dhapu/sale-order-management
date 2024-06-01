import React from 'react';
import { useForm } from 'react-hook-form';
import { FormControl, FormLabel, Input, Button, Box } from '@chakra-ui/react';

const CustomerForm = ({ onNext }) => {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input {...register('name')} placeholder="Enter Customer Name" />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input {...register('email')} type="email" placeholder="Enter Customer Email" />
      </FormControl>
      <FormControl id="location" isRequired>
        <FormLabel>Location</FormLabel>
        <Input {...register('location')} placeholder="Enter Location" />
      </FormControl>
      <FormControl id="pincode" isRequired>
        <FormLabel>Pincode</FormLabel>
        <Input {...register('pincode')} placeholder="Enter Pincode" />
      </FormControl>
      <Button mt={4} colorScheme="blue" type="submit">
        Next
      </Button>
    </Box>
  );
};

export default CustomerForm;
