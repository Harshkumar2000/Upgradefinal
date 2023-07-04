import React, { useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import axios from "axios";

const FormContainer = styled(Container)({
  marginTop: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

const StyledTypography = styled(Typography)({
  marginTop: "8px",
});

const StyledButton = styled(Button)({
  margin: "24px 0 16px",
});

const AddAddress = (props) => {
  const [name, setName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [street, setStreet] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const submitForm = useCallback((event) => {
    event.preventDefault();
    setSubmitAction(true);
  }, []);
  const [submitAction, setSubmitAction] = React.useState(false);

  useEffect(() => {
    async function addAddress() {
      if (!submitAction) {
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:3001/api/v1/addresses",
          {
            name,
            city,
            state,
            street,
            contactNumber: number,
            landmark,
            zipCode,
          },
          {
            headers: {
              "x-auth-token": axios.defaults.headers.common["x-auth-token"],
            },
          }
        );
        toast.success(`Address ${name} added successfully`);
        console.log(data);
        props.setRefresh(!props.refresh);
      } catch (ex) {
        toast.error(ex.message);
      } finally {
        setSubmitAction(false);
      }
    }

    addAddress();
  }, [submitAction, city, landmark, name, number, props, state, street, zipCode]);

  return (
    <FormContainer component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <StyledTypography variant="h5">Add Address</StyledTypography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="number"
                label="Contact Number"
                type="number"
                id="number"
                autoComplete="contact-number"
                value={number}
                onChange={(event) => setNumber(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="street"
                label="Street"
                name="street"
                autoComplete="street"
                value={street}
                onChange={(event) => setStreet(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="state"
                label="State"
                name="state"
                autoComplete="state"
                value={state}
                onChange={(event) => setState(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="landmark"
                label="Landmark"
                name="landmark"
                autoComplete="landmark"
                value={landmark}
                onChange={(event) => setLandmark(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zipcode"
                label="Zip Code"
                name="zipcode"
                autoComplete="zipcode"
                value={zipCode}
                onChange={(event) => setZipCode(+event.target.value)}
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={submitForm}
          >
            Save Address
          </StyledButton>
        </form>
      </div>
    </FormContainer>
  );
};

export default AddAddress;
