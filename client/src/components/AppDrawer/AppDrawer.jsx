import React from "react";

import { useHistory } from "react-router-dom";

import { useSelector } from "react-redux";

import Box from "@material-ui/core/Box";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
  list: {
    width: 250
  },
  top: {
    width: "100%",
    height: 175,
    backgroundColor: theme.palette.primary.main,
    position: "relative"
  },
  topWrapper: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    color: "#fff",
    padding: "0 10px",
    boxSizing: "border-box"
  },
  username: {
    fontSize: theme.typography.fontSize * 1.5,
    fontWeight: "bold"
  }
}));

function AppDrawer(props) {
  const classes = useStyle();
  const history = useHistory();
  const email = useSelector(state => state.user.email);
  return (
    <Drawer {...props}>
      <div className={classes.top}>
        <div className={classes.topWrapper}>
          <Box marginBottom={1} clone>
            <AccountCircleIcon fontSize={"large"} />
          </Box>

          <Typography
            className={classes.username}
            color="inherit"
            noWrap
            paragraph
          >
            williamj1788
          </Typography>
          <Typography color="inherit" noWrap paragraph>
            {email}
          </Typography>
        </div>
      </div>
      <List className={classes.list}>
        {[
          ["Dashboard", <MenuIcon />, "/dashboard"],
          ["Classes", <ScheduleIcon />, "/classes"],
          ["Tasks", <CheckSharpIcon />, "/tasks"],
          ["Exams", <AssignmentIcon />, "/exams"],
          ["Settings", <SettingsIcon />, "/settings"]
        ].map((list, index) => (
          <ListItem button key={index} onClick={() => history.push(list[2])}>
            <ListItemIcon>{list[1]}</ListItemIcon>
            <ListItemText primary={list[0]} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default AppDrawer;
