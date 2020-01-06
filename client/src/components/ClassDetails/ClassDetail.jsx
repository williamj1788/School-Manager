import React, { useRef, useState } from "react";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import CloseIcon from "@material-ui/icons/Close";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { makeStyles } from "@material-ui/core";

import { useSelector } from "react-redux";

const useStyle = makeStyles(theme => ({
  title: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.getContrastText(theme.palette.primary.main)
  }
}));

function ClassDetail({ open, classID, onClose }) {
  const [isSettingOpen, setIsSettingOpen] = useState(false);

  const classes = useStyle();
  const classObj =
    useSelector(state => state.classes.find(c => c._id === classID)) || {};

  const settingElement = useRef(null);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ backgroundColor: classObj.color, color: "white" }}>
        {classObj.name}
        <IconButton onClick={() => setIsSettingOpen(true)}>
          <MoreVertIcon style={{ color: "white" }} />
        </IconButton>
        <IconButton onClick={onClose} ref={settingElement}>
          <CloseIcon style={{ color: "white" }} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={settingElement.current}
          keepMounted
          open={isSettingOpen}
          onClose={() => setIsSettingOpen(false)}
        >
          <MenuItem>Delete Class</MenuItem>
          <MenuItem>Edit Class</MenuItem>
        </Menu>
      </DialogTitle>
      <DialogContent>
        <p>Teacher: {classObj.teacher}</p>
        <p>Mon - Tues - Weds</p>
      </DialogContent>
    </Dialog>
  );
}

export default ClassDetail;
