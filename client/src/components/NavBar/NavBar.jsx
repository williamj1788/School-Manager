import React, { useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../redux/action";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import MenuIcon from "@material-ui/icons/Menu";
import SettingsIcon from "@material-ui/icons/Settings";

function NavBar({ onMenuClick, children, title }) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const settingElement = useRef();

  const dispatch = useDispatch();

  return (
    <AppBar position="sticky">
      <ToolBar>
        <IconButton color="inherit" onClick={onMenuClick}>
          <MenuIcon data-testid="menu" />
        </IconButton>
        <Typography variant="h6" className="dashboard-title">
          {title}
        </Typography>
        <IconButton color="inherit" onClick={() => setIsSettingOpen(true)}>
          <SettingsIcon ref={settingElement} />
        </IconButton>
        <Menu
          anchorEl={settingElement.current}
          open={isSettingOpen}
          onClose={() => setIsSettingOpen(false)}
        >
          <MenuItem onClick={() => dispatch(signOut())}>Sign Out</MenuItem>
        </Menu>
      </ToolBar>
      {children}
    </AppBar>
  );
}

export default NavBar;
