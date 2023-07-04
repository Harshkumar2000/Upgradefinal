import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./component/SignUp";
import SignIn from "./component/SignIn";
import AddProduct from "./component/AddProduct"
import EditProduct from "./component/EditProduct";
import CreateOrder from "./component/CreateOrders";
import Home from "./component/Home";
import ProductList from "./component/ProductList";
import ProductDetails from "./component/ProductDetails";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route exact path="/users" element={<Signup />} />
        <Route path="/auth" element={<SignIn />} />
        <Route adminOnly={true} path="/add-product" element={<AddProduct />} />
        <Route adminOnly={true} path="/modify-product/:id" element={<EditProduct />} />
        <Route adminOnly={false} path="/order/:id/:quantity" element={<CreateOrder />} />
        <Route adminOnly={false} path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        

      </Routes>
    </Router>
  );
}

export default App;
