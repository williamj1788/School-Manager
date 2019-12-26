import React, { useState } from "react";

import "./Dashboard.scss";

import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import { makeStyles } from "@material-ui/core/styles";

import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import AssignmentIcon from "@material-ui/icons/Assignment";

const useStyle = makeStyles({
  container: {
    height: "200vh"
  },
  paper: {
    position: "sticky"
  },
  list: {
    width: 250
  }
});

function Dashboard() {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <AppBar position="sticky">
        <ToolBar>
          <IconButton color="inherit" onClick={() => setOpen(o => !o)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="dashboard-title">
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </ToolBar>
        <TabsNav />
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <List className={classes.list}>
          <ListItem button>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Exams" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Drawer>
      <Container className={classes.container}>sdfsd</Container>
    </React.Fragment>
  );
}

function TabsNav() {
  const classes = useStyle();
  const [tab, setTab] = useState(0);
  return (
    <Paper className={classes.paper} elevation={0} square>
      <Tabs variant="fullWidth" value={tab} centered>
        <Tab
          label="Schedule"
          icon={<ScheduleIcon />}
          onClick={() => setTab(0)}
        />
        <Tab label="Task" icon={<CheckSharpIcon />} onClick={() => setTab(1)} />
        <Tab
          label="Exams"
          icon={<AssignmentIcon />}
          onClick={() => setTab(2)}
        />
      </Tabs>
    </Paper>
  );
}

export default Dashboard;
