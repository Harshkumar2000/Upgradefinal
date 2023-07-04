import React, { useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";
import Typography from '@mui/material/Typography';
import { styled, ThemeProvider, createTheme } from '@mui/system';

const FormContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const Form = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const theme = createTheme();

const EditProductForm = (props) => {
  const [data, setData] = React.useState({});
  const [submitAction, setSubmitAction] = React.useState(false);

  const { match, history } = props;
  const productId = window.location.pathname.split('/');

  useEffect(() => {
    if (!productId[2]) {
      history.push("/home");
    }

    async function getProductDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/v1/products/${productId[2]}`
        );
        setData(response.data);
      } catch (ex) {
        console.log(ex);
        //history.push("/home");
      }
    }

    getProductDetails();
  }, [productId, history]);

  useEffect(() => {
    async function modifyProduct() {
      if (!submitAction) {
        return;
      }

      try {
        await axios.put(
          `http://localhost:3001/api/v1/products/${productId}`,
          data
        );
        toast.success(`Product ${data.name} modified successfully`);
        console.log(data);
      } catch (ex) {
        toast.error(ex.response.data);
      } finally {
        setSubmitAction(false);
        history.push("/products");
      }
    }

    modifyProduct();
  }, [submitAction, data, productId, history]);

  const submitForm = (event) => {
    event.preventDefault();
    setSubmitAction(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <FormContainer>
          <Typography variant="h5">Modify Product</Typography>
          <Form>
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
                  value={data.name || ""}
                  onChange={(event) =>
                    setData({ ...data, name: event.target.value })
                  }
                />
              </Grid>
              {/* Rest of the fields */}
            </Grid>
            <SubmitButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={submitForm}
            >
              Modify Product
            </SubmitButton>
          </Form>
        </FormContainer>
      </Container>
    </ThemeProvider>
  );
};

export default EditProductForm;
