import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from './theme';
import LoginPage from './pages/LoginPage';
import SaleOrderPage from './pages/SaleOrderPage';

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sale-orders" element={<PrivateRoute><SaleOrderPage /></PrivateRoute>} />
            {/* <Route path="/sale-orders" element={<SaleOrderPage />} /> */}
            <Route path="*" element={<Navigate to="/sale-orders" />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ChakraProvider>
  );
}

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('isAuthenticated');
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
