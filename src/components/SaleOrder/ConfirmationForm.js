import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Button, Checkbox } from '@chakra-ui/react';

const ConfirmationForm = ({ onSubmit, customerData, saleOrderData }) => {
  const { handleSubmit, register, setValue } = useForm();

  useEffect(() => {
    let totalPrice = 0;
    let totalQuantity = 0;

    saleOrderData.forEach((order) => {
      totalPrice += parseFloat(order.selling_rate); // Assuming selling_rate is the price
      totalQuantity += parseInt(order.total_items, 10);
    });

    setValue('totalPrice', totalPrice);
    setValue('totalQuantity', totalQuantity);
  }, [saleOrderData, setValue]);

  const handleFinalSubmit = (data) => {
    const finalData = {
      customer_name: customerData.name,
      customer_email: customerData.email,
      customer_id: customerData.id,
      items: saleOrderData.map((order) => ({
        sku_id: order.sku,
        price: parseInt(order.selling_rate, 10), // ensure selling_rate is a number
        quantity: parseInt(order.total_items, 10), // ensure total_items is a number
      })),
      paid: data.paid || false,
      invoice_no: data.invoice_no,
      invoice_date: data.invoice_date,
    };
    onSubmit(finalData);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(handleFinalSubmit)}>
      <FormControl id="totalPrice" isRequired>
        <FormLabel>Total Price</FormLabel>
        <Input type="number" {...register('totalPrice')} placeholder="Total Price" readOnly />
      </FormControl>
      <FormControl id="totalQuantity" isRequired>
        <FormLabel>Total Quantity</FormLabel>
        <Input type="number" {...register('totalQuantity')} placeholder="Total Quantity" readOnly />
      </FormControl>
      <FormControl id="invoice_no" isRequired>
        <FormLabel>Invoice Number</FormLabel>
        <Input {...register('invoice_no')} placeholder="Enter Invoice Number" />
      </FormControl>
      <FormControl id="invoice_date" isRequired>
        <FormLabel>Invoice Date</FormLabel>
        <Input type="date" {...register('invoice_date')} />
      </FormControl>
      <FormControl id="paid">
        <FormLabel>Paid</FormLabel>
        <Checkbox {...register('paid')}>Paid</Checkbox>
      </FormControl>
      <Button mt={4} colorScheme="blue" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default ConfirmationForm;
