import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ItemPreview = ({ id, quantity, imageDisplay = true }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({});

  useEffect(() => {
    if (!id) {
      navigate("/products");
    }

    async function getProductDetails() {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/api/v1/products/${id}`
        );
        setData(data);
      } catch (ex) {
        navigate("/products");
      }
    }

    getProductDetails();
  }, [id, navigate]);

  return (
    <Box display="flex" mt={5} justifyContent="center">
      {imageDisplay && (
        <Box height="90%">
          <img src={data.imageURL} alt={data.name} height="400px" />
        </Box>
      )}
      <Box marginLeft={2}>
        <Box display="flex" alignItems="center">
          <Typography variant="h4" style={{ marginRight: "20px" }}>
            {data.name}
          </Typography>
        </Box>
        <Typography
          variant="h6"
          style={{ marginTop: "10px", fontSize: "16px" }}
        >
          Quantity: <b>{quantity}</b>
        </Typography>
        <Typography
          variant="h6"
          style={{ marginTop: "10px", fontSize: "16px" }}
        >
          Category: <b>{data.category}</b>
        </Typography>
        <Typography
          variant="h6"
          style={{ marginTop: "20px", fontSize: "16px", fontStyle: "italic" }}
        >
          {data.description || "No description available"}
        </Typography>
        <Typography
          variant="h5"
          style={{ marginTop: "20px", fontSize: "24px", color: "red" }}
        >
          Total Price: ₹ {+data.price * +quantity}
        </Typography>
      </Box>
    </Box>
  );
};

export default ItemPreview;
