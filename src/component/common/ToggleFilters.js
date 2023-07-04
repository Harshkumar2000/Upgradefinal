import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import axios from "axios";

export default function ToggleButtons() {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = React.useState("All");
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await axios.get("http://localhost:3001/api/v1/products/categories"); 
        setCategories(["All", ...data]);
      } catch (ex) {
        console.log(ex);
      }
    }

    getCategories();
  }, []);

  const handleChange = (event, nextView) => {
    if (nextView !== null) {
      setView(nextView);
      let searchParams = new URLSearchParams(location.search);
      searchParams.delete("category");
      if (nextView !== "All") {
        searchParams.set("category", nextView);
      }
      navigate({
        pathname: "/products",
        search: searchParams.toString(),
      });
    }
  };

  return (
    <ToggleButtonGroup value={view} exclusive onChange={handleChange}>
      {categories.map((category) => (
        <ToggleButton key={category} value={category} aria-label={category}>
          {category}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
