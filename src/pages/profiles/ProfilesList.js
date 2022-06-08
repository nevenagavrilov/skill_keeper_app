import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useState, useCallback } from "react";
import Profile from "./Profile";
import classes from "./ProfilesList.module.css";
// import SearchProfiles from "./SearchProfiles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useHttp from "../../hooks/useHttp";

const ProfilesList = ({
  profiles,
  deleteProfileHandler,
  updateProfileHandler,
  isUpdateOpen,
  updateProfile,
}) => {
  const [profileId, setProfileId] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [profileName, setProfileName] = useState("");
  const [profileDateOfBirth, setProfileDateOfBirth] = useState("");
  const [profileLocation, setProfileLocation] = useState("");

  const { loading, error, getData } = useHttp(
    "https://6195285474c1bd00176c6be7.mockapi.io/profiles"
  );

  const selectProfileHandler = (props) => {
    updateProfile(true);
    setProfileId(props.id);
    setProfileName(props.name);
    setProfileImage(props.image);
    setProfileDateOfBirth(props.dateOfBirth);
    setProfileLocation(props.location);
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

  // const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  // const filterChangeHandler = (name) => {
  //   const fProfiles =
  //     (name &&
  //       (name.length > 0
  //         ? profiles
  //         : profiles.filter((profile) =>
  //             profile.name.toLowerCase().includes(name.toLowerCase())
  //           ))) ||
  //     profiles;
  //   debugger;
  //   if (filteredProfiles.length !== fProfiles.length) {
  //     debugger;
  //     setFilteredProfiles(fProfiles);
  //   }
  // };
  // filterChangeHandler();

  let content = <p>Found no profiles</p>;

  if (profiles.length > 0) {
    content = (
      <ul className={classes.profilesList}>
        {profiles.map((profile) => (
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

  if (loading) {
    content = <p>Loading...</p>;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  return (
    <>
      {/* <SearchProfiles onChangeFilter={filterChangeHandler} /> */}
      <>{content}</>
      {isUpdateOpen && (
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
            onClick={() =>
              updateProfileHandler({
                profileId,
                profileImage,
                profileName,
                profileDateOfBirth,
                profileLocation,
                skName,
              })
            }
          >
            Update Profile
          </Button>
        </Box>
      )}
    </>
  );
};

export default ProfilesList;
