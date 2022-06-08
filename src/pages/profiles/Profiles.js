import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import classes from "./Profiles.module.css";
import ProfilesList from "./ProfilesList";
import Button from "@mui/material/Button";
import useHttp from "../../hooks/useHttp";

const Profiles = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  // const navigate = useNavigate();

  const { data: profiles, getData } = useHttp(
    "https://6195285474c1bd00176c6be7.mockapi.io/profiles"
  );

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
    ).then(getData);
  };

  const updateProfileHandler = async ({
    profileId,
    profileImage,
    profileName,
    profileDateOfBirth,
    profileLocation,
    skName,
  }) => {
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
    )
      .then(getData)
      .finally(() => {
        setIsUpdateOpen(false);
      });
  };

  const addProfileHandler = async (newProfile) => {
    await fetch(
      "https://6195285474c1bd00176c6be7.mockapi.io/profiles",
      {
        method: "POST",
        body: JSON.stringify(newProfile),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(getData);
  };

  // const addProfileHandler = async (newProfile) => {
  //   sendProfilesHandler({
  //     url: "https://6195285474c1bd00176c6be7.mockapi.io/profiles",
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: { ...newProfile },
  //   }).then();
  // };

  const displayFormHandler = () => {
    setIsClicked(true);
  };

  return (
    <div className={classes.profiles}>
      <ProfilesList
        profiles={profiles}
        deleteProfileHandler={deleteProfileHandler}
        updateProfileHandler={updateProfileHandler}
        isUpdateOpen={isUpdateOpen}
        updateProfile={setIsUpdateOpen}
      />
      <Button
        sx={{ backgroundColor: "#636363", margin: "20px" }}
        variant="contained"
        onClick={displayFormHandler}
      >
        ADD PROFILE
      </Button>
      {isClicked && <ProfileForm onAddProfile={addProfileHandler} />}
    </div>
  );
};

export default Profiles;
