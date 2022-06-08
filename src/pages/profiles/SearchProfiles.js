import * as React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { Button } from "@mui/material";

const SearchProfiles = (props) => {
  const [profiles, setProfiles] = useState([]);
  const nameRef = useRef();

  const fetchProfilesHandler = useCallback(async () => {
    const response = await fetch(
      "https://6195285474c1bd00176c6be7.mockapi.io/profiles"
    );
    const data = await response.json();

    const loadedProfiles = [];
    for (const key in data) {
      loadedProfiles.push({
        id: data[key].id,
        name: data[key].name,
        image: data[key].image,
        dateOfBirth: data[key].dateOfBirth,
        location: data[key].location,
        skills: data[key].skills,
      });
    }
    setProfiles(loadedProfiles);
  }, []);

  useEffect(() => {
    fetchProfilesHandler();
  }, [fetchProfilesHandler]);

  const dropdownChnageHandler = () => {
    let name = nameRef.current.value;
    props.onChangeFilter(name);
  };

  return (
    <Stack spacing={2} sx={{ width: 200, padding: 2 }}>
      <Autocomplete
        id="free-solo-demo"
        freeSolo
        options={profiles.map((option) => option.name)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search profile name"
            variant="standard"
            value={params}
            inputRef={nameRef}
          />
        )}
      />
      <Button
        sx={{ backgroundColor: "#636363" }}
        variant="contained"
        onClick={dropdownChnageHandler}
      >
        Find
      </Button>
    </Stack>
  );
};

export default SearchProfiles;
