import { useState } from "react";
import SkillsList from "./SkillsList";
import classes from "./Skills.module.css";
import SkillForm from "./SkillForm";
import Button from "@mui/material/Button";

const Skills = () => {
  const [isClicked, setIsClicked] = useState(false);

  const displayFormHandler = () => {
    setIsClicked(true);
  };

  const addSkillHandler = async (newSkill) => {
    await fetch(
      "https://6195285474c1bd00176c6be7.mockapi.io/skills",
      {
        method: "POST",
        body: JSON.stringify(newSkill),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <div className={classes.skills}>
      <SkillsList />
      <Button
        sx={{ backgroundColor: "#636363", margin: "20px" }}
        variant="contained"
        onClick={displayFormHandler}
      >
        ADD SKILL
      </Button>
      {isClicked && <SkillForm onAddSkill={addSkillHandler} />}
    </div>
  );
};

export default Skills;
