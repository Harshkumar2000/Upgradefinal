// Method:1 using simple HTML and Material Ui at button and Textfield

// import React, { useState } from "react";
// import { Button, TextField } from "@mui/material";

// const SignupPage = (props) => {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [rePassword, setRePassword] = useState("");
//   const [error, setError] = useState("");

//   const handleUserNameChange = (e) => {
//     setUserName(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleRePasswordChange = (e) => {
//     setRePassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const data = new FormData(e.currentTarget);
//     if (password !== rePassword) {
//       setError("Passwords do not match");
//     } else if (!password.match(/[!@#$%^&*(),.?":{}|<>]/)) {
//       setError("Password must contain at least one special character");
//     } else {
//       setUserName("");
//       setPassword("");
//       setRePassword("");
//       setError("");
//       console.log("passed");
//       console.log({
//         email: data.get('email'),
//         password: data.get('password'),
//       });
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <h2>Signup</h2>
//         <div>
//           <TextField
//             variant="standard"
//             label="UserName"
//             type="text"
//             value={userName}
//             placeholder="Enter Username"
//             onChange={handleUserNameChange}
//           />
//         </div>

//         <div>
//           <TextField
//             variant="standard"
//             label="Password"
//             type="password"
//             value={password}
//             placeholder="Enter Password"
//             onChange={handlePasswordChange}
//           />
//         </div>

//         <div>
//           <TextField
//             variant="standard"
//             label="Re-password"
//             type="password"
//             value={rePassword}
//             placeholder="Re-enter Password"
//             onChange={handleRePasswordChange}
//           />
//           {error && <p>{error}</p>}
//         </div>

//         <div>
//           <Button variant="contained" type="submit">
//             Submit
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignupPage;


// Method:2 using Material Ui 

import React, { useState} from "react"; 
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "./Appbar";
import CopyRight from "./common/CopyRight";
import axios from "axios";

const defaultTheme = createTheme();

export default function SignUp() {

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const[password, setPassword] = useState("");
  const[rePassword, setRePassword] = useState("");
  const [email, setEmail] = React.useState("");
  
  // const [submitAction, setSubmitAction] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      rePassword: data.get("rePassword")
    };

    try {
      // Make a POST request to the signup API endpoint
      const response = await axios.post("http://localhost:3001/api/v1/users", userData);

      console.log(response.data);

      localStorage.setItem("userData", JSON.stringify(userData));
      
      // Redirect to the homepage
      window.location.href = "./"; 
    } catch (error) {
      console.error(error);
      // Handle any errors that occurred during the API call
    }
  };

  const HandleSigninClick = (e) => {
    e.preventDefault();

    window.location.href = "/auth";
  };

  return (
    <ThemeProvider theme={defaultTheme} >
      <AppBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         
          <Typography component="h1" variant="h5" >
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={firstName}
                  autoFocus
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lastName}
                  autoComplete="family-name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={password}
                  autoComplete="password"
                  onChange={(e) => 
                    setPassword(e.currentTarget.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="RePassword"
                  type="password"
                  id="rePassword"
                  value={rePassword}
                  autoComplete="Re-password"
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center" >
              <Grid item>
                <Link href="#" variant="body2" onClick={HandleSigninClick}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <CopyRight sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
