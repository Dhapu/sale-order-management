import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, FormControl, FormLabel, Input, Button, Text } from '@chakra-ui/react';
import Select from 'react-select';

const SaleOrderForm = ({ onNext }) => {
  const { handleSubmit, control, register, setValue, watch } = useForm();
  const [selectedProducts, setSelectedProducts] = useState([]);

  const productOptions = [
    { value: 'Product1', label: 'Product 1', sku: 225, price: 100, quantity: 10 },
    { value: 'Product2', label: 'Product 2', sku: 227, price: 200, quantity: 20 },
    { value: 'Product3', label: 'Product 3', sku: 230, price: 150, quantity: 15 },
    { value: 'Product4', label: 'Product 4', sku: 235, price: 180, quantity: 8 },
    { value: 'Product5', label: 'Product 5', sku: 240, price: 120, quantity: 5 },
  ];

  const handleProductChange = (selectedOptions) => {
    setSelectedProducts(selectedOptions);
  };

  const updateSellingRate = (product, totalItems) => {
    const sellingRate = totalItems * product.price;
    setValue(`selling_rate_${product.sku}`, sellingRate);
  };

  const getRemainingQuantity = (product) => {
    const totalItems = watch(`total_items_${product.sku}`);
    return product.quantity - (totalItems ? parseInt(totalItems, 10) : 0);
  };

  const onSubmit = (data) => {
    const saleOrderItems = selectedProducts.map((product) => ({
      sku: product.sku,
      selling_rate: data[`selling_rate_${product.sku}`],
      total_items: data[`total_items_${product.sku}`],
    }));
    onNext(saleOrderItems);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="products" isRequired>
        <FormLabel>All Products</FormLabel>
        <Controller
          name="products"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              isMulti
              options={productOptions}
              onChange={handleProductChange}
              placeholder="Select Products"
            />
          )}
        />
      </FormControl>
      {selectedProducts.map((product, index) => (
        <Box key={product.value} mt={4}>
          <FormControl id={`sku_${product.sku}`} isRequired>
            <FormLabel>{`${index + 1}. SKU ${product.sku} (${product.price} USD per unit)`}</FormLabel>
            <FormLabel>Selling Rate</FormLabel>
            <Input
              type="text"
              {...register(`selling_rate_${product.sku}`)}
              placeholder="Enter Selling Rate"
              readOnly
            />
            <FormLabel>Total Items</FormLabel>
            <Input
              type="text"
              {...register(`total_items_${product.sku}`)}
              placeholder="Enter Quantity"
              onChange={(e) => updateSellingRate(product, e.target.value)}
            />
            <Text>Remaining Quantity: {getRemainingQuantity(product)}</Text>
          </FormControl>
        </Box>
      ))}
      <Button mt={4} colorScheme="blue" type="submit">
        Next
      </Button>
    </Box>
  );
};

export default SaleOrderForm;
