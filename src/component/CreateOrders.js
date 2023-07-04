import React, { useEffect, useState } from "react";
import AddressForm from "./AddressFom";
import { styled } from "@mui/system";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { toast } from "react-toastify";
import Box from '@mui/material/Box';
import ItemPreview from "./ItemsPreview";
import ConfirmOrder from "./ConfirmOrder";
import axios from "axios";

const RootContainer = styled("div")({
  width: "80%",
  marginLeft: "10%",
  marginRight: "10%",
  marginTop: "2%",
});

const StyledButton = styled(Button)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const InstructionsTypography = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

function getSteps() {
  return ["Items", "Select Address", "Confirm Order"];
}

function getStepContent(itemId, quantity, step, address, setAddress) {
  switch (step) {
    case 0:
      return <ItemPreview id={itemId} quantity={quantity} />;
    case 1:
      return (
        <AddressForm
          address={address}
          onAddressChange={(value) => setAddress(value)}
        />
      );
    case 2:
      return <ConfirmOrder id={itemId} quantity={quantity} addressId={address.value} />;
    default:
      return null;
  }
}

export default function HorizontalLinearStepper(props) {
  const [activeStep, setActiveStep] = useState(0);
  const [address, setAddress] = useState("");
  const [orderAction, setOrderAction] = useState(false);
  const [productId, setProductId] = useState();
  const [quantityID, setQuantityID] = useState(0);
  useEffect(() => {
    const idArr = window.location.pathname.split('/')
    setProductId(idArr[2])
    setQuantityID(idArr[3])
    async function createOrder() {
      if (!orderAction) {
        return;
      }

      try {
         await axios.post("http://localhost:3001/api/v1/orders", {
          addressId: address.value,
          productId: productId,
          quantity: quantityID,
        });

        toast.success(`Order placed successfully`);
        window.location.href ="/products"
      } catch (ex) {
        toast.error(ex.response.data);
      } finally {
        setOrderAction(false);
        ///window.location.href ="/products"
      }
    }

    createOrder();
  }, [orderAction, address, productId, quantityID]);

  const steps = getSteps();

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setOrderAction(true);
      return;
    }

    if (activeStep === 1) {
      if (!address) {
        toast.error("Please select address!");
        return;
      }
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <RootContainer>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <InstructionsTypography>
              Order placed successfully!
            </InstructionsTypography>
          </div>
        ) : (
          <div>
            <InstructionsTypography>
              {getStepContent(
                productId,
                quantityID,
                // props.match.params.id,
                // props.match.params.quantity,
                activeStep,
                address,
                setAddress
              )}
            </InstructionsTypography>
            <Box display="flex" flexDirection="row" justifyContent="center">
              <StyledButton
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </StyledButton>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? "Place Order" : "Next"}
              </StyledButton>
            </Box>
          </div>
        )}
      </div>
    </RootContainer>
  );
}
