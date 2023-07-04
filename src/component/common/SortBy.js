import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SortBy = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedSortBy, setSelectedSortBy] = useState("default");

  const sortOptions = [
    {
      label: "Default",
      value: "default",
    },
    {
      label: "Price: High to Low",
      value: "priceDesc",
    },
    {
      label: "Price: Low to High",
      value: "priceAsc",
    },
    {
      label: "Newest",
      value: "newest",
    },
  ];

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    let searchParams = new URLSearchParams(location.search);
    searchParams.delete("sortBy");
    searchParams.delete("direction");
    if (selectedValue !== "default") {
      switch (selectedValue) {
        case "priceDesc":
          searchParams.set("sortBy", "price");
          searchParams.set("direction", "desc");
          break;
        case "priceAsc":
          searchParams.set("sortBy", "price");
          searchParams.set("direction", "asc");
          break;
        case "newest":
          searchParams.set("sortBy", "createdAt");
          searchParams.set("direction", "desc");
          break;
        default:
          break;
      }
    }

    navigate(`/products?${searchParams.toString()}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sortBy = searchParams.get("sortBy");
    const direction = searchParams.get("direction");

    let selectedValue = "default";
    if (sortBy === "price" && direction === "desc") {
      selectedValue = "priceDesc";
    } else if (sortBy === "price" && direction === "asc") {
      selectedValue = "priceAsc";
    } else if (sortBy === "createdAt" && direction === "desc") {
      selectedValue = "newest";
    }

    setSelectedSortBy(selectedValue);
  }, [location.search]);

  return (
    <Box mt={2}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="sort-by-label">Sort By:</InputLabel>
        <Select
          labelId="sort-by-label"
          label="Sort By"
          value={selectedSortBy}
          onChange={handleSortChange}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortBy;
