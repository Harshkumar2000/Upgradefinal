import React, { useEffect } from "react";
import { Box } from '@mui/material';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import ToggleButtons from "./common/ToggleFilters";
import ProductDetails from "./ProductDetails";
import ProductList from "./ProductList";
import SearchAppBar from "./SearchAppBar";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = axios.defaults.headers.common["Authorization"];

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/auth");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <Box mt={2} display="flex" justifyContent="center">
        <ToggleButtons />
        <SearchAppBar />
      </Box>
      {/* <Routes location={location}>
        <Route path="/products" element={<ProductList />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
      </Routes> */}
    </>
  );
};

export default Home;
