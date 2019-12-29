import React from "react";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";

function NavBar({ onMenuClick, children, title }) {
  return (
    <AppBar position="sticky">
      <ToolBar>
        <IconButton color="inherit" onClick={onMenuClick}>
          <MenuIcon data-testid="menu" />
        </IconButton>
        <Typography variant="h6" className="dashboard-title">
          {title}
        </Typography>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
      </ToolBar>
      {children}
    </AppBar>
  );
}

export default NavBar;
