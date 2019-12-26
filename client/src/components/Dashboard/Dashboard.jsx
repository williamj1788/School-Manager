import React, { useState } from "react";

import "./Dashboard.scss";

import Container from "@material-ui/core/Container";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";
import ScheduleIcon from "@material-ui/icons/Schedule";
import CheckSharpIcon from "@material-ui/icons/CheckSharp";
import AssignmentIcon from "@material-ui/icons/Assignment";

function Dashboard() {
  const [tab, setTab] = useState(0);
  return (
    <Container>
      <AppBar>
        <ToolBar>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="dashboard-title">
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </ToolBar>
        <Tabs variant="fullWidth" value={tab} centered>
          <Tab
            label="Schedule"
            icon={<ScheduleIcon />}
            onClick={() => setTab(0)}
          />
          <Tab
            label="Task"
            icon={<CheckSharpIcon />}
            onClick={() => setTab(1)}
          />
          <Tab
            label="Exams"
            icon={<AssignmentIcon />}
            onClick={() => setTab(2)}
          />
        </Tabs>
      </AppBar>
    </Container>
  );
}

export default Dashboard;
