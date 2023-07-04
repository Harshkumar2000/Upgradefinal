import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Appbar from "./Appbar";
import CopyRight from "./common/CopyRight";
import SearchAppBar from "./SearchAppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddIcon from '@mui/icons-material/Add';
import axios from "axios";

const defaultTheme = createTheme();

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAppbar, setShowAppbar] = useState(true); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send signup data to the API
      const response = await axios.post("http://localhost:3001/api/v1/auth", {
        email,
        password,
      });

      setIsLoggedIn(true);
      setIsAdmin(response.data.isAdmin);
      setShowAppbar(false); // Show Appbar only when logged in

      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      window.location.href = "/products";

    } catch (error) {
      console.error(error.response.data);
    }
  };

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    // If there is saved data, set it in the component state
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  const HandleSignupClick = async (e) => {
    e.preventDefault();

    window.location.href ="./users";

    if (isLoggedIn) {
      window.location.href = "/products";
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      {showAppbar && <Appbar />} 
      {isLoggedIn ? (
        <div className="header-container">
          <SearchAppBar />
          {isAdmin && (
            <Link to="/add-products" style={{ display: "flex", alignItems: "center" }}>
              <AddIcon style={{ marginRight: "5px" }} />
              Add Products
            </Link>
          )}
        </div>
      ) : (
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
            <Typography component="h1" variant="h5">
              Sign In
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={HandleSignupClick}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <CopyRight sx={{ mt: 5 }} />
        </Container>
      )}
    </ThemeProvider>
  );
}

// import React, { useState } from "react";
// import { Button, TextField } from "@mui/material";

// const SigninPage = (props) => {
//   const [userName, setUserName] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [setIsValid] = useState(false);

//   const handleUserNameChange = (e) => {
//     setUserName(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!userName || !password) {
//       setError("Please fill in all field")
//     }
//     else {
//       setError(" ")
//       setIsValid(true);
//     console.log("Sucssesfully submited");
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

//         {error && <p>{error}</p>}

//         <Button variant="contained" type="submit">
//           Submit
//         </Button>
//       </form>
//     </div>
//   );
// };

// export default SigninPage;
