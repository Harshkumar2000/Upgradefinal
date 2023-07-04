import Box from '@mui/material/Box';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Dialog from "./common/Dialog";
import ProductCard from "./common/ProductCard";
import SortBy from "./common/SortBy";
import SearchAppBar from './SearchAppBar';

// import ToggleButtons from "./common/ToggleFilters";


const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [dialogType, setDialogType] = useState("");
  const [deleteAction, setDeleteAction] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    async function searchProducts() {
      try {
       
        const res = await axios.get(`http://localhost:3001/api/v1/products`); 
        setProducts(res.data);
      } catch (ex) {
        toast.error("Failed to fetch products.");
      }
    }

    searchProducts();
  }, []);

  // useEffect(() => {
  //  async function deleteProduct() {
  //     if (!deleteAction) {
  //       return;
  //     }

  //     try {
  //        await axios.delete(`/api/products/${selectedProduct._id}`); // Replace with your actual API endpoint
  //       toast.success(`Product ${selectedProduct.name} deleted successfully`);
  //     } catch (ex) {
  //       toast.error(ex.response.data);
  //     } finally {
  //       setDeleteAction(false);
  //       setSelectedProduct({ _id: "", name: "" });
  //     }
  //   }

  //   deleteProduct();
  // }, [deleteAction, selectedProduct._id, selectedProduct.name]);
  useEffect(() => {
    
   }, [deleteAction, selectedProduct._id, selectedProduct.name]);

  return (
    <>
    <SearchAppBar />
      <Box display="flex" flexDirection="column" height="60vh">
        <Box width="20%" style={{marginLeft: '65px'}}>
          <SortBy />
        </Box>
        <Box
          m={2}
          flexWrap="wrap"
          display="flex"
          justifyContent="space-evenly"
          width="95%"
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              data={product}
              onDelete={() => {
                setSelectedProduct(product);
                setDialogType("delete");
              }}
              onEdit={() =>
                window.location.href = `/modify-product/${product._id}`
              }
              onBuy={() =>
                window.location.href =`/product-details/${product._id}`
              }
            />
          ))}
        </Box>
        {dialogType === "delete" && (
          <Dialog
            title="Confirm deletion of product!"
            content="Are you sure you want to delete the product?"
            onClose={() => setDialogType("")}
            onConfirm={() => {
              setDeleteAction(true);
              setDialogType("");
            }}
          />
        )}
      </Box>
    </>
  );
};

export default ProductList;
