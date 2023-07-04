import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";

const SelectCategory = ({ value, onChange }) => {
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    async function getProductCategories() {
      try {
        const { data } = await axios.get("http://localhost:3001/api/v1/products/categories");
        setProductCategories(data.map((element) => ({ value: element, label: element })));
      } catch (error) {
        console.log(error);
      }
    }

    getProductCategories();
  }, []);

  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      options={productCategories}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField {...params} label="Select or add category..." placeholder="Select or add category..." />
      )}
    />
  );
};

export default SelectCategory;
