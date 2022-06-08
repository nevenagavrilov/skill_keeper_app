import * as React from "react";
import Card from "@mui/material/Card";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";

const Profile = (props) => {
  const deleteProfileHandler = () => {
    props.onDeleteProfile(props.id);
  };

  const selectProfileHandler = () => {
    props.onEditProfile(props);
  };

  return (
    <Card
      style={{
        width: "100%",
        bgcolor: "background.paper",
        maxWidth: "400px",
        margin: "5px",
      }}
    >
      <List>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt={props.name} src={props.image} />
          </ListItemAvatar>
          <ListItemText>
            <React.Fragment>
              <Typography gutterBottom variant="h5" component="div">
                {props.name}
              </Typography>
              <Typography gutterBottom component="div">
                {props.dateOfBirth}
              </Typography>
              <Typography gutterBottom component="div">
                {props.location}
              </Typography>
              <Typography gutterBottom component="div">
                {props.skills}
              </Typography>
            </React.Fragment>
          </ListItemText>
        </ListItem>
        <ListItem alignItems="center">
          <IconButton
            aria-label="delete"
            size="small"
            onClick={deleteProfileHandler}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            aria-label="edit"
            size="small"
            onClick={selectProfileHandler}
          >
            <EditTwoToneIcon />
          </IconButton>
        </ListItem>
      </List>
    </Card>
  );
};

export default Profile;
