import React, { useState } from "react";

import "./Dashboard.scss";

import Container from "@material-ui/core/Container";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";

import { makeStyles } from "@material-ui/core/styles";

import ScheduleIcon from "@material-ui/icons/Schedule";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import AssignmentIcon from "@material-ui/icons/Assignment";

import AppDrawer from "../AppDrawer/AppDrawer";
import NavBar from "../NavBar/NavBar";

const useStyle = makeStyles({
  container: {
    height: "200vh"
  },
  paper: {
    position: "sticky"
  }
});

function Dashboard() {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <NavBar title="Dashboard" onMenuClick={() => setOpen(!open)}>
        <TabsNav />
      </NavBar>
      <AppDrawer open={open} onClose={() => setOpen(false)} />
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
