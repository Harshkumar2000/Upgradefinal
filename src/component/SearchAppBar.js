import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import axios from "axios";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function SearchAppBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/products");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    console.log(filteredData);
  };

  const Logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    window.location.href = "/";
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            {/* <MenuIcon /> */}
          </IconButton>
          <ShoppingCartIcon />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            upGrad Eshop
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={handleSearch}
            />
          </Search>
          <Button variant="contained" onClick={Logout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


// import React, { useState } from "react";
// import TextField from '@mui/material/TextField';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';

// const SearchMenu = ({ data }) => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const handleSearch = (event) => {
//     const searchTerm = event.target.value.toLowerCase();
//     setSearchTerm(searchTerm);

//     const filteredData = data.filter((item) =>
//       item.toLowerCase().includes(searchTerm)
//     );
//     setSearchResults(filteredData);
//   };

//   return (
//     <div>
//       <TextField
//         label="Search"
//         variant="outlined"
//         value={searchTerm}
//         onChange={handleSearch}
//       />

//       <List>
//         {searchResults.map((result, index) => (
//           <ListItem key={index}>
//             <ListItemText primary={result} />
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default SearchMenu;

// import React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// // import upgradLogo from "./Asset/Upgrad logo.png";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// export default function LoggedPage() {

//   // const [isLoggedIn, setIsLoggedIn] = useState(false);
//   // const [isAdmin, setIsAdmin] = useState(false);
//   const Logout = () => {
//     // setIsLoggedIn(false);
//     // setIsAdmin(false);
//     localStorage.removeItem("email");
//     localStorage.removeItem("password");
//     window.location.href = "/";
//   };
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <IconButton
//             size="large"
//             edge="start"
//             color="transparent"
//             aria-label="menu"
//             sx={{ mr: 2 }}
//           >
//             <ShoppingCartIcon />
//           </IconButton>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             upGrad Eshop
//           </Typography>
//           <input type="text" placeholder="Search" />
//           <Button variant="contained" onClick={Logout}>
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
