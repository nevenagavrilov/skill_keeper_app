import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

import CardMedia from "@mui/material/CardMedia";

import { Button, IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const SkillTable = ({ skills }) => {
  const [sortedSkills, setSortedSkills] = useState(skills);
  const [skillName, setSkillName] = useState("");
  const [skillImage, setSkillImage] = useState("");
  const [skillId, setSkillId] = useState(null);
  const [isClicked, setIsClicked] = useState(false);

  const sortByName = () => {
    setSortedSkills([
      ...skills.sort((a, b) => a.name.localeCompare(b.name)),
    ]);
  };

  const selectSkillHandler = (id) => {
    setIsClicked(true);
    let skill = skills.find((e) => e.id === id);
    setSkillId(skill.id);
    setSkillName(skill.name);
    setSkillImage(skill.image);
  };

  const updateSkillHandler = async () => {
    const updatedSkill = {
      id: skillId,
      name: skillName,
      image: skillImage,
    };
    await fetch(
      `https://6195285474c1bd00176c6be7.mockapi.io/skills/${skillId}`,
      {
        method: "PUT",
        body: JSON.stringify(updatedSkill),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  return (
    <>
      <TableContainer component={Paper} sx={{ margin: 5 }}>
        <Table sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Image</TableCell>
              <TableCell
                align="left"
                style={{ cursor: "pointer" }}
                onClick={sortByName}
              >
                Name&darr;
              </TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedSkills.map((skill) => (
              <TableRow
                key={skill.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell align="left">{skill.id}</TableCell>
                <TableCell align="left">
                  <CardMedia
                    component="img"
                    alt="name"
                    image={skill.image}
                    value={skill.image}
                    style={{
                      width: "60px",
                    }}
                  />
                </TableCell>
                <TableCell align="left" value={skill.name}>
                  {skill.name}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    size="small"
                    onClick={async () => {
                      await fetch(
                        `https://6195285474c1bd00176c6be7.mockapi.io/skills/${skill.id}`,
                        {
                          method: "DELETE",
                          body: JSON.stringify(),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      );
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    size="small"
                    onClick={() => selectSkillHandler(skill.id)}
                  >
                    <EditTwoToneIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isClicked && (
        <Box>
          <TextField
            sx={{
              margin: "10px",
              width: "400px",
            }}
            id="standard-basic"
            label="Image"
            variant="standard"
            value={skillImage}
            onChange={(e) => {
              setSkillImage(e.target.value);
            }}
          />
          <TextField
            sx={{
              margin: "10px",
              width: "100px",
            }}
            id="standard-basic"
            label="Name"
            variant="standard"
            value={skillName}
            onChange={(e) => {
              setSkillName(e.target.value);
            }}
          />
          <Button
            sx={{
              margin: "10px",
              backgroundColor: "#636363",
            }}
            variant="contained"
            type="submit"
            onClick={() => updateSkillHandler()}
          >
            Update Skill
          </Button>
        </Box>
      )}
    </>
  );
};

export default SkillTable;
