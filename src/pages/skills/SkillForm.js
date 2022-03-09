import { useRef } from "react";
import TextField from "@mui/material/TextField";

import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

const SkillForm = (props) => {
  const skillNameRef = useRef();
  const skillImageRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    if (
      skillNameRef.current.value.trim().length === 0 ||
      skillImageRef.current.value.trim().length === 0
    ) {
      return;
    } else {
      const newSkill = {
        name: skillNameRef.current.value,
        image: skillImageRef.current.value,
      };
      props.onAddSkill(newSkill);
    }
    skillNameRef.current.value = "";
    skillImageRef.current.value = "";
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
            inputRef={skillNameRef}
          />
        </Grid>
        <Grid>
          <TextField
            id="standard-basic"
            label="Image"
            variant="standard"
            inputRef={skillImageRef}
          />
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

export default SkillForm;
