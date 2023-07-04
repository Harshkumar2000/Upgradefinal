// import { Box, Divider, Paper } from "@mui/material";
import { Box } from "@mui/material";
import {Divider} from "@mui/material";
import {Paper} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import AddressDetails from "./AddressDetails";
import ItemPreview from "./ItemsPreview";

const ConfirmOrder = ({ id, quantity, addressId }) => {
  console.log(addressId);
  const [address, setAddress] = useState({});

  useEffect(() => {
    async function getAddressDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/addresses/${addressId}`,
          {
            headers: {
              "x-auth-token": axios.defaults.headers.common["x-auth-token"],
            },
          }
        );
        setAddress(response.data);
      } catch (ex) {
        console.log(ex);
      }
    }

    getAddressDetails();
  }, [addressId]);

  return (
    <>
      <Paper>
        <Box height="60vh" display="flex" justifyContent="space-evenly">
          <Box width="60%">
            <ItemPreview id={id} quantity={quantity} imageDisplay={false} />
          </Box>
          <Divider orientation="vertical" />
          <Box width="35%">
            <AddressDetails data={address} />
          </Box>
        </Box>
      </Paper>
    </>
  );
};

export default ConfirmOrder;
