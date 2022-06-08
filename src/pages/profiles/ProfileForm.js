import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import * as React from "react";
import { useState, useCallback, useEffect, useRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ProfileForm = (props) => {
  const profileNameRef = useRef();
  const profileDateOfBirthRef = useRef();
  const profileLocationRef = useRef();
  const profileImageRef = useRef();
  const profileSkillsRef = useRef();

  const [skName, setSkName] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();
    if (
      profileNameRef.current.value.trim().length === 0 ||
      profileDateOfBirthRef.current.value.trim().length === 0 ||
      profileLocationRef.current.value.trim().length === 0 ||
      profileImageRef.current.value.trim().length === 0
    ) {
      return;
    } else {
      const newProfile = {
        name: profileNameRef.current.value,
        dateOfBirth: profileDateOfBirthRef.current.value,
        location: profileLocationRef.current.value,
        image: profileImageRef.current.value,
        skills: profileSkillsRef.current.value,
      };
      props.onAddProfile(newProfile);
    }
    profileNameRef.current.value = "";
    profileDateOfBirthRef.current.value = "";
    profileLocationRef.current.value = "";
    profileImageRef.current.value = "";
    profileSkillsRef.current.value = "";
  };

  const [skillsNames, setSkillsNames] = useState([]);
  const fetchSkillsHandler = useCallback(async () => {
    const response = await fetch(
      "https://6195285474c1bd00176c6be7.mockapi.io/skills"
    );
    const data = await response.json();

    const nameOfSkills = [];
    for (const key in data) {
      nameOfSkills.push(data[key].name);
    }
    setSkillsNames(nameOfSkills);
  }, []);
  useEffect(() => {
    fetchSkillsHandler();
  }, [fetchSkillsHandler]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkName(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <form onSubmit={submitHandler}>
      <Grid
        container
        alignItems="center"
        justify="center"
        direction="column"
      >
        <Grid item>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            inputRef={profileNameRef}
          />
        </Grid>
        <Grid>
          <TextField
            sx={{
              width: "22.5ch",
            }}
            id="standard-basic"
            variant="standard"
            label="Birthday"
            type="date"
            min="1950-01-01"
            max="2022-01-01"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue="1994-05-24"
            inputRef={profileDateOfBirthRef}
          />
        </Grid>
        <Grid>
          <TextField
            id="standard-basic"
            label="Location"
            variant="standard"
            inputRef={profileLocationRef}
          />
        </Grid>
        <Grid>
          <TextField
            id="standard-basic"
            label="Image"
            variant="standard"
            inputRef={profileImageRef}
          />
        </Grid>
        <Grid
          sx={{
            paddingTop: "5px",
          }}
        >
          <FormControl
            variant="standard"
            sx={{
              width: "23ch",
            }}
          >
            <InputLabel
              sx={{
                width: "23ch",
              }}
              id="standard-basic"
              variant="standard"
              label="Skills"
              shrink
              htmlFor="select-multiple-native"
            >
              Skills
            </InputLabel>
            <Select
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={skName}
              onChange={handleChange}
              inputRef={profileSkillsRef}
            >
              {skillsNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid>
          <Button
            sx={{
              margin: "10px",
              backgroundColor: "#636363",
            }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
          <Button
            sx={{
              margin: "10px",
              backgroundColor: "#636363",
            }}
            variant="contained"
            type="reset"
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileForm;
