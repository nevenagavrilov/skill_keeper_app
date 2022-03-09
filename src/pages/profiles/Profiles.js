import { useState } from "react";
import ProfileForm from "./ProfileForm";
import classes from "./Profiles.module.css";
import ProfilesList from "./ProfilesList";
import Button from "@mui/material/Button";

const Profiles = () => {
  const [isClicked, setIsClicked] = useState(false);

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
    ).then();
  };

  const displayFormHandler = () => {
    setIsClicked(true);
  };

  return (
    <div className={classes.profiles}>
      <ProfilesList />
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
