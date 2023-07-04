import React, { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import axios from "axios";

const SelectAddress = ({ value, onChange, refresh }) => {
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    async function getAddresses() {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(
          "http://localhost:3001/api/v1/addresses",
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );
        setAddresses(
          data.map((el) => ({
            value: el._id,
            label: `${el.name} --> ${el.street}, ${el.city}`,
          }))
        );
      } catch (ex) {
        console.log(ex);
      }
    }

    getAddresses();
  }, [refresh]);

  return (
    <>
      <label>Select Address</label>
      <Autocomplete
        value={value}
        onChange={onChange}
        options={addresses}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <input
              type="text"
              {...params.inputProps}
              className="MuiInputBase-input MuiOutlinedInput-input"
            />
          </div>
        )}
      />
    </>
  );
};

export default SelectAddress;
