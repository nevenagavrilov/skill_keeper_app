import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState, useCallback } from "react";
import Profile from "./Profile";
import classes from "./ProfilesList.module.css";

import SearchProfiles from "./SearchProfiles";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ProfilesList = () => {
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [isClicked, setIsClicked] = useState(false);

  const [profileId, setProfileId] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileDateOfBirth, setProfileDateOfBirth] = useState("");
  const [profileLocation, setProfileLocation] = useState("");

  const fetchProfilesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://6195285474c1bd00176c6be7.mockapi.io/profiles"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
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
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);
  useEffect(() => {
    fetchProfilesHandler();
  }, [fetchProfilesHandler]);

  const deleteProfileHandler = async (id) => {
    await fetch(
      `https://6195285474c1bd00176c6be7.mockapi.io/profiles/${id}`,
      {
        method: "DELETE",
        body: JSON.stringify(),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(fetchProfilesHandler);
  };

  const selectProfileHandler = (props) => {
    setIsClicked(true);
    setProfileId(props.id);
    setProfileName(props.name);
    setProfileImage(props.image);
    setProfileDateOfBirth(props.dateOfBirth);
    setProfileLocation(props.location);
  };

  const updateProfileHandler = async () => {
    const updatedProfile = {
      id: profileId,
      image: profileImage,
      name: profileName,
      dateOfBirth: profileDateOfBirth,
      location: profileLocation,
      skills: skName,
    };
    await fetch(
      `https://6195285474c1bd00176c6be7.mockapi.io/profiles/${profileId}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedProfile),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(fetchProfilesHandler);
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

  const [skName, setSkName] = useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSkName(typeof value === "string" ? value.split(",") : value);
  };

  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  const filterChangeHandler = (name) => {
    setFilteredProfiles(
      name === ""
        ? profiles
        : profiles.filter((profile) =>
            profile.name.toLowerCase().includes(name.toLowerCase())
          )
    );
  };

  let content = <p>Found no profiles</p>;

  if (profiles.length > 0) {
    content = (
      <ul className={classes.profilesList}>
        {filteredProfiles.map((profile) => (
          <Profile
            key={profile.id}
            id={profile.id}
            name={profile.name}
            image={profile.image}
            dateOfBirth={profile.dateOfBirth}
            location={profile.location}
            skills={profile.skills}
            onDeleteProfile={deleteProfileHandler}
            onEditProfile={selectProfileHandler}
          />
        ))}
      </ul>
    );
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <>
      <SearchProfiles onChangeFilter={filterChangeHandler} />
      <>{content}</>
      {isClicked && (
        <Box>
          <TextField
            sx={{
              margin: "10px",
              width: "150px",
            }}
            id="standard-basic"
            label="Image"
            variant="standard"
            value={profileImage}
            onChange={(e) => {
              setProfileImage(e.target.value);
            }}
          />
          <TextField
            sx={{
              margin: "10px",
              width: "150px",
            }}
            id="standard-basic"
            label="Name"
            variant="standard"
            value={profileName}
            onChange={(e) => {
              setProfileName(e.target.value);
            }}
          />
          <TextField
            sx={{
              margin: "10px",
              width: "150px",
            }}
            id="standard-basic"
            label="DateOfBirth"
            variant="standard"
            value={profileDateOfBirth}
            onChange={(e) => {
              setProfileDateOfBirth(e.target.value);
            }}
          />
          <TextField
            sx={{
              margin: "10px",
              width: "150px",
            }}
            id="standard-basic"
            label="Location"
            variant="standard"
            value={profileLocation}
            onChange={(e) => {
              setProfileLocation(e.target.value);
            }}
          />
          <FormControl
            variant="standard"
            sx={{
              margin: "10px",
              width: "150px",
            }}
          >
            <InputLabel
              id="standard-basic"
              variant="standard"
              label="Skills"
              shrink
              htmlFor="select-multiple-native"
            >
              Skills
            </InputLabel>
            <Select
              sx={{
                width: "150px",
              }}
              label="Skills"
              variant="standard"
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={skName}
              onChange={handleChange}
            >
              {skillsNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{
              margin: "10px",
              backgroundColor: "#636363",
            }}
            variant="contained"
            type="submit"
            onClick={() => updateProfileHandler()}
          >
            Update Profile
          </Button>
        </Box>
      )}
    </>
  );
};

export default ProfilesList;
