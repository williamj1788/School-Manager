import React from "react";

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
            jacquezwilliams115@gmail.com
          </Typography>
        </div>
      </div>
      <List className={classes.list}>
        <ListItem button>
          <ListItemIcon>
            <MenuIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <ScheduleIcon />
          </ListItemIcon>
          <ListItemText primary="Classes" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <CheckSharpIcon />
          </ListItemIcon>
          <ListItemText primary="Tasks" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Exams" />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default AppDrawer;
